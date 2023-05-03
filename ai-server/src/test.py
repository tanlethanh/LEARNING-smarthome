import sys
import os
import time
from utils.speed_to_text import *
from utils.openaiapi import *
from utils.command import processing_text, parse_command, handle_command
dir = os.path.dirname(__file__)

model_dir = os.path.join(dir, "../model")
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

from neuralintents import GenericAssistant

def handle_command_intent(topic: list[str], res):
    print(res, "<--")
    processed_text = processing_text(res)
    result = parse_command(processed_text)
    print("Parsed: {}".format(result))

    if result is None:
        print("Res: I dont understand, can you repeat")

    res = handle_command(result)
    return {"typ": "command", "res": res}
    
def handle_informative_intent(topic: list[str], res):
    if topic[0] == "weather":
        print("Take action to get weather")
    elif topic[0] == "all_devices":
        print("Take action to get all device")
    res = ""
    return {"typ": "informative", "res": ",".join(topic)}

def handle_external_intent(topic: list[str], res):
    res = get_openai_response(res, context)
    return {"typ": "external", "res": res}


def handle_greeting_intent(topic: list[str], res):
    print("access greeting")
    return {"typ": "greeting", "res": res}

intent_methods = {
    "command": handle_command_intent,
    "informative": handle_informative_intent,
    "another": handle_external_intent,
    "greeting": handle_greeting_intent
}
context = [
    {'role':'user',
     'content': "Image you're a polite and friendly assistant in my iot app.\
         Your'name is Sovi and you will help me to find result of my request.\
        Try to make response as short as possible, i just want to get main content of the response, it's good to have response shorter than 20 words! Thank you!"
         }
    ]

class Assistant:
    
    def __init__(self):
        self.assistant = GenericAssistant(os.path.join(dir, "./intents.json"), intent_methods=intent_methods)
        # self.assistant.load_model()
        self.assistant.train_model()
        self.assistant.save_model()
        self.context = context
        
    def run_assistant(self):
        while 1:
            text = get_audio()
            if text.count(TERMINATE) > 0:
                speak('Ok! See you later!')
                sys.exit()
            else:
                res = self.assistant.request(text)
                if res.get("typ") == 'greeting':
                    speak("I am ready")
                    while 1:
                        command = get_audio()
                        if command == "":
                            continue
                        print('User: {}'.format(command))
                        self.context += [{'role':'user', 'content': command}]
                        if command.count(STOP) > 0:
                            speak('Ok! You can call me later with {}'.format(WAKE))
                            break
                        res = self.assistant.request(command)
                        self.context += [{'role':'assistant', 'content': res.get("res")}]
                        print("Sovi:{}".format(res.get('res')))
                        speak(res.get('res'))

print("\n------------- Init assistant -------------\n")
st = time.time()
ass = Assistant()
en = time.time()

print("Init time: {} s".format(en - st))

print("\n------------- Done  -------------\n")

ass.run_assistant()


