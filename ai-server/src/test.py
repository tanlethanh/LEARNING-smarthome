import sys
import os
import time

dir = os.path.dirname(__file__)

model_dir = os.path.join(dir, "../model")
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

from neuralintents import GenericAssistant

def handle_command_intent():
    pass

def handle_informative_intent(topic: list[str]):
    print(topic)
    if topic[0] == "weather":
        print("Take action to get weather")
    elif topic[0] == "all_devices":
        print("Take action to get all device")

def handle_external_intent():
    pass

intent_methods = {
    "command": handle_command_intent,
    "informative": handle_informative_intent,
    "another": handle_external_intent
}

class Assistant:
    
    def __init__(self):
        self.assistant = GenericAssistant(os.path.join(dir, "./intents.json"), intent_methods=intent_methods)
        self.assistant.train_model()
        self.assistant.save_model()
        
    def run_assistant(self):
        while True:
            command = input("Type your command: ")
            if command == 'exits':
                sys.exit()
                
            res = self.assistant.request(command)

            print("Reponse: " , res)

print("\n------------- Init assistant -------------\n")
st = time.time()
ass = Assistant()
en = time.time()

print("Init time: {} s".format(en - st))

print("\n------------- Done  -------------\n")

ass.run_assistant()


