import time
import os
import random
from openai import OpenAI


# make a hash map of types and their response content
contentmap = {
    "lecture": "Generate a lecture style text with actual explanations on the topic and the response should be separated into sentences and each sentence should represented as a slide. No empty lines in the response. There should be less than 2 slides for the topic",
    "presentation": "This is a presentation.",
    "story": "This is a story.",
}


class GenerationManager:
    def __init__(self, session_id, prompt, response_style_type="lecture"):
        self.client = OpenAI(api_key=os.environ['OPENAI_KEY'])
        
        self.session_id = session_id
        # generate transcript
        self.transcript = self.generate_transcript(prompt, response_style_type)
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
        sentences = transcript.split("\n")
        self.slides_text= sentences
        counter = 1
        # use generate_image to generate an image and audio for each paragraph
        for sentence in sentences:
            image_url = self.generate_image("Generate an image that matches the following topic " + sentence)
            self.images.append(image_url)
            audio_dir = self.generate_audio(text=sentence,session_id="12345", file_name="slide"+str(counter))
            self.audios.append(audio_dir)
            counter +=1

        # TODO: download images to local directory

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

    def generate_image(self,prompt_text, testing=True, model="dall-e-3"):
        """Function to get an image URL based on the provided text prompt"""

        image_url=""
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

        image_url = self._get_random_test_image()
        print("Success: IMG_URL = " + image_url)
        # add image to images array

        return image_url

    def generate_audio(self,text, session_id,file_name="slide",model="tts-1", voice="alloy"):
    
        path = os.curdir + "/audios/" + str(session_id)
        filename = "/audio_"+file_name+".mp3"
        self._create_directory(path)
        audio_dir = path+filename

        response = self.client.audio.speech.create(
            model=model,
            voice=voice,
            input=text,
        )
        
        # add image to images array
        response.stream_to_file(audio_dir)
        return audio_dir

    def _get_random_test_image(self):
        """
        Creates a directory for the session.
        """
        # Mimic API wait times
        time.sleep(10)
        return random.choice(["https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s800-c85.webp","https://hips.hearstapps.com/hmg-prod/images/walking-on-the-danxia-landform-royalty-free-image-1623252956.jpg?resize=1200:*"])

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


generator = GenerationManager("session_123", "Local Area Networks")
# generator.generate_audio("Wow I am actually surprised that this is working so seemlessly, things are going nicely so far. Beautiful stuff","696969")
# generator.generate_image(prompt_text="An image of a coke bottle",testing=True)
generator.generate_slideshow(prompt="Local Area Networks", type=contentmap["lecture"])
print(generator.images)
print(generator.audios)
print(generator.slides_text)
