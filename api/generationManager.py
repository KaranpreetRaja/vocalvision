import requests
import time
import os
import random
from openai import OpenAI
from fileStorageAPI import firebase_upload


DELIMITER = "%5%"
TESTING = True
# make a hash map of types and their response content
contentmap = {
    "lecture": "Generate a lecture transcript that should span about three slides. Separate the slides by the following delimiter: "
    + DELIMITER
    + " The transcript should not have any other indicators of a new slide.",
    "presentation": "This is a presentation.",
    "story": "This is a story.",
}


class GenerationManager:
    def __init__(self, session_id, prompt, response_style_type="lecture"):
        self.client = OpenAI(api_key=os.environ["OPENAI_KEY"])

        self.session_id = session_id
        # generate transcript
        # self.transcript = self.generate_transcript(prompt, response_style_type)
        self.audios = []
        self.images = []
        self.slides_text = []

    def generate_slideshow(self, prompt, type):
        """
        Creates a slideshow from a transcript.
        """

        if type not in contentmap:
            response_style_type = type
        else:
            response_style_type = contentmap[type]

        # use generate_transcript to generate a transcript
        transcript = self.generate_transcript(prompt, response_style_type)

        # segment transcript into paragraphs
        sentences = transcript.split(DELIMITER)
        self.slides_text = sentences
        counter = 1
        # use generate_image to generate an image and audio for each paragraph
        for sentence in sentences:
            image_url = self.generate_image(
                "Generate an image that matches the following topic " + sentence,
                session_id=self.session_id,
                file_name="slide" + str(counter),
            )
            self.images.append(image_url)
            audio_dir = self.generate_audio(
                text=sentence,
                session_id=self.session_id,
                file_name="slide" + str(counter),
            )
            self.audios.append(audio_dir)
            counter += 1

        # TODO: return slideshow after serializing it

        pass

    def generate_transcript(self, prompt, response_style_type):
        """
        Uses gpt api to generate a transcript from a prompt.
        """
        # use gpt api to generate transcript
        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": response_style_type},
                {"role": "user", "content": prompt},
            ],
        )
        transcript = completion.choices[0].message.content

        # segment transcript into sentences
        return transcript

    def generate_image(
        self,
        prompt_text,
        session_id,
        file_name="slide",
        testing=TESTING,
        model="dall-e-3",
    ):
        """Function to get an image URL based on the provided text prompt"""

        image_url = ""
        # If in testing mode, get a random test image URL
        if not testing:
            # Generate an image URL using OpenAI's image generation API
            response = self.client.images.generate(
                model=model,
                prompt=prompt_text,
                size="1024x1024",
                quality="standard",
                n=1,
            )
            image_url = response.data[0].url
        else:
            image_url = self._get_random_test_image()
        print("Success: IMG_URL = " + image_url)

        cur_path = os.path.dirname(os.path.realpath(__file__))
        path = cur_path + "/images/"
        saved_file_name = "image_" + str(session_id) + "_" + file_name + ".png"
        self._create_directory(path)
        file_path = path + saved_file_name

        # Add image to Firebase and return the Firebase URL
        firebase_url = firebase_upload(self._download_image(image_url, file_path))
        return firebase_url

    def generate_audio(
        self, text, session_id, file_name="slide", model="tts-1", voice="alloy"
    ):
        cur_path = os.path.dirname(os.path.realpath(__file__))
        path = cur_path + "/audios/"
        saved_file_name = "audio_" + str(session_id) + "_" + file_name + ".mp3"
        self._create_directory(path)
        audio_dir = path + saved_file_name

        response = self.client.audio.speech.create(
            model=model,
            voice=voice,
            input=text,
        )

        response.stream_to_file(audio_dir)
        firebase_url = firebase_upload(audio_dir)
        return firebase_url

    def _get_random_test_image(self):
        """
        Creates a directory for the session.
        """
        # Mimic API wait times
        time.sleep(3)
        return random.choice(
            [
                "https://hips.hearstapps.com/hmg-prod/images/walking-on-the-danxia-landform-royalty-free-image-1623252956.jpg?resize=1200:*",
            ]
        )

    def _create_directory(self, folder_path):
        """
        Creates a random test image.
        """
        # Specify the directory path
        directory_path = folder_path

        # Check if the directory exists
        if not os.path.exists(directory_path):
            # Create the directory if it does not exist
            os.makedirs(directory_path)
            print(f"Directory '{directory_path}' created.")
        else:
            print(f"Directory '{directory_path}' already exists.")

    def _download_image(self, url, save_path):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for bad responses (e.g., 404 Not Found)

            with open(save_path, "wb") as file:
                file.write(response.content)

            print(f"Image downloaded successfully and saved at: {save_path}")

            return save_path
        except requests.exceptions.RequestException as e:
            print(f"Error downloading image: {e}")


generator = GenerationManager("session_123", "Mammoth History")
# generator.generate_audio(
#     "Wow I am actually surprised that this is working so seemlessly, things are going nicely so far. Beautiful stuff",
#     "1696969",
# )
# generator.generate_image(
#     prompt_text="An image of a coke bottle", testing=True, session_id="12345"
# )
generator.generate_slideshow(prompt="Mammoth History", type=contentmap["lecture"])
print(generator.images)
print(generator.audios)
print(generator.slides_text)
