import speech_recognition
import pyttsx3 as tts
import tkinter as tk
import threading
import sys
import os
import sys
import os
import time
from utils.speed_to_text import *
from utils.openaiapi import *
dir = os.path.dirname(__file__)

dir = os.path.dirname(__file__)

model_dir = os.path.join(dir, "../model")
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

from neuralintents import GenericAssistant

class Assistant:
    
    def __init__(self):
        self.recognizer = speech_recognition.Recognizer()
        self.speaker = tts.init()
        self.speaker.setProperty('rate', 150)
        self.assistant = GenericAssistant(os.path.join(dir, "./intents.json"),intent_methods={"file": self.create_file})
        self.assistant.train_model()
        self.assistant.save_model()
        threading.Thread(target=self.run_assistant).start()
        
    def create_file(self):
        print("Hello world")

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
                        print('User: {}'.format(command))
                        self.context += [{'role':'user', 'content': command}]
                        if command.count(STOP) > 0:
                            speak('Ok! You can call me later with {}'.format(WAKE))
                            break
                        res = self.assistant.request(command)
                        self.context += [{'role':'assistant', 'content': res.get("res")}]
                        print("Sovi:{}".format(res.get('res')))
                        speak(res.get('res'))


Assistant()