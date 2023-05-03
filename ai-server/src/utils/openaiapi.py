import os
import openai
from dotenv import load_dotenv
env_path = os.path.join(os.getcwd(), '..','..','.env')
load_dotenv(dotenv_path=env_path)
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.organization = "org-KJ7P4fSVyo2eYA4HP4xPZLTv"

def to_text(audio_file):
    res = ""
    with open(audio_file) as file:
        res = openai.Audio.transcribe(
            model='whisper-1',
            file=file
        )
    return res.text

def get_openai_response(request: str ="", ctx=[])->str:


    rsp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=ctx
    )
        # prompt="You're going to be a polite and friendly assistant in my iot app.\
        #     Your'name is Sovi and you will help user to find result of their request.",
            # Can you get result of the following request. Request begin with `[BEGIN]` and end with `[END]`.\
            # Please response only result of the request.\
            # Thankyou!! [BEGIN]{}[END]".format(request),
        # temperature=0,
        # max_tokens=60,
        # top_p=1,
        # frequency_penalty=0,
        # presence_penalty=0,

    return rsp.choices[0].message.content