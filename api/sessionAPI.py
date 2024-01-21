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
    "session_name": "session name",
    "session_owner": "session owner id",
    "session userid": "session user id",
    "behavior": "behavior"
}

JSON response format:
{
    "session_id": "session id"
}
'''
@session_api.route('/create', methods=['POST'])
def create():
    try:
        # save session in firestore
        session = request.json
        session = sessions_ref.add(session)[1].id
        return jsonify({'session_id': session}), 200
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
        
        # get session from firestore
        session = sessions_ref.document(session_id).get().to_dict()
        
        if not session:
            return jsonify({'error': 'session not found'}), 400
        
        # get prompt from request
        prompt = request.json['prompt']

        # get behavior from session
        behavior = session['behavior']

        # make a slideshow from the prompt and behavior
        manager = GenerationManager(session_id)
        slideshow = manager.generate_slideshow(prompt, behavior)


        # make
    except Exception as e:
        return jsonify({'error': 'error: ' + str(e)}), 400


