from openai import OpenAI

global client
client = OpenAI()

# make a hash map of types and their response content
contentmap = {
    "lecture": "This is a lecture.",
    "presentation": "This is a presentation.",
    "story": "This is a story.",
}

class GenerationManager:
    def __init__(self, session_id):
        self.session_id = session_id
        
        # generate transcript
        self.transcript = self.generate_transcript()
    
    def generate_slideshow(self, prompt, type):
        """
        Creates a slideshow from a transcript.
        """

        if type not in contentmap:
            responsecontent = type
        else:
            responsecontent = contentmap[type]
        

        # use generate_transcript to generate a transcript
        transcript = self.generate_transcript(prompt, responsecontent)
        
        # segment transcript into paragraphs
        sentences = transcript.split("\n")

        # use generate_image to generate an image and audio for each paragraph
        for sentence in sentences:
            image_url = self.generate_image(sentence)
            audio_dir = self.generate_audio(sentence)

        # TODO: download images to local directory
        
        # TODO: return slideshow after serializing it

        pass

    def generate_transcript(self, prompt, content):
        """
        Uses gpt api to generate a transcript from a prompt.
        """

        global client
        if not client:
            client = OpenAI()

        # use gpt api to generate transcript
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": content},
            {"role": "user", "content": prompt}
        ]
        )
        transcript = completion.choices[0].text
        
        # segment transcript into sentences
        return transcript
    
    def generate_image():
        """
        Uses gpt api to generate an image.
        """
        pass

    def generate_audio(self, prompt):
        """
        Uses gpt api to generate audio from a prompt.
        """
        pass

    def create_directory(self):
        """
        Creates a directory for the session.
        """
        pass

    def create_random_test_image(self):
        """
        Creates a random test image.
        """
        pass

