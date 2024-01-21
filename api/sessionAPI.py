from flask import Blueprint, request, jsonify
from firebase_admin import firestore, auth

from generationManager import GenerationManager

session_api = Blueprint('session_api', __name__)

db = firestore.client()
sessions_ref = db.collection('sessions')

'''
POST /api/session/create

Description: Creates a new session in the database.

JSON request format:
{
  "userInfoData": {
    "session_name": "session name",
    "session_owner": "session owner id",
    "session userid": "session user id",
  },
  "userPromptData": {
    "behavior": "behavior",
    "prompt": "prompt",
    "slideLimit": 10
  }
}


JSON response format:
{
    "session_id": "session id"
    {
        "slides": [
            {
                "slide_id": "slide id"
                "slide_text": "slide text"
                "slide_image_url": "url"
                "slide_audio_url": "url"
            }
            ...
        ]

    }
}
'''
@session_api.route('/create', methods=['POST'])
def create():
    try:
        print("checkpoint 0.1")
        # save session in firestore
        session = request.json
        session_id = sessions_ref.document().id
        session['session_id'] = session_id
        sessions_ref.document(session_id).set(session)

        print("checkpoint 0.2")

        # get prompt from request
        prompt = session['userPromptData']['prompt']
        print(prompt)

        # get behavior from request
        behavior = session['userPromptData']['behavior']
        print(behavior)

        print("checkpoint 1")

        # make a slideshow from the prompt and behavior
        manager = GenerationManager(session_id)
        slideshow_input = manager.generate_slideshow(prompt, behavior)

        print("checkpoint 2")

        # parse slideshow_input to put all content for a slide in a single dictionary make a new list of slides
        object = []

        for i in range(len(slideshow_input['slides_text'])):
            slide = {}
            slide['slide_id'] = str(i)
            slide['slide_text'] = slideshow_input['slides_text'][i]
            slide['slide_image_url'] = slideshow_input['images'][i]
            slide['slide_audio_url'] = slideshow_input['audios'][i]

            object.append(slide)

        print("checkpoint 3")

        # append slideshow in firestore
        sessions_ref.document(session_id).update({'slides': object})

        print("checkpoint 4")

        return jsonify({'session_id': session_id, 'slides': object}), 200


    except Exception as e:
        return jsonify({'error': str(e)}), 400

'''
POST /api/session/use
{
    "session_id": "session id"
    "prompt": "prompt"
}

JSON response format:
{
    "session_id": "session id"
    {
        "slides": [
            {
                "slide_id": "slide id"
                "slide_text": "slide text"
                "slide_image_url": "url"
                "slide_audio_url": "url"
            }
            ...
        ]

    }
}

JSON error format:
{
    "error": "error message"
}
'''
@session_api.route('/use', methods=['POST'])
def use():
    try:
        # get session id from request
        session_id = request.json['session_id']

        # get prompt from request
        prompt = request.json['prompt']

        # get behavior from firestore
        session = sessions_ref.document(session_id).get().to_dict()
        behavior = session['userPromptData']['behavior']

        # make a slideshow from the prompt and behavior
        manager = GenerationManager(session_id)
        slideshow_input = manager.generate_slideshow(prompt, behavior)

        # parse slideshow_input to put all content for a slide in a the slides array from firestore
        object = sessions_ref.document(session_id).get().to_dict()['slides']

        for i in range(len(slideshow_input['slides'])):
            slide = slideshow_input['slides'][i]
            slide['slide_id'] = str(i)
            slide['slide_text'] = slideshow_input['slides_text'][i]
            slide['slide_image_url'] = slideshow_input['images'][i]
            slide['slide_audio_url'] = slideshow_input['audios'][i]

            object[str(i)] = slide

        # add slideshow to the perevious slide show in firestore at the end of the "slides" array
        sessions_ref.document(session_id).update({'slides': object})

        return jsonify({'session_id': session_id, 'slides': object}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
