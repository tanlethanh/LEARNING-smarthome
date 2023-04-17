import speech_recognition
import pyttsx3 as tts
import tkinter as tk
import threading
import sys
import os

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
        
        self.root = tk.Tk()
        self.label = tk.Label(text="Hello world", font=("Arial", 120, "bold"))
        
        self.label.pack()
        
        threading.Thread(target=self.run_assistant).start()
        
        self.root.mainloop()

    def create_file(self):
        print("Hello world")

    def run_assistant(self):
        while True:
            print("Reloop")
            self.label.config(fg="black")
            try:
                print("\tStart")
                with speech_recognition.Microphone() as mic:
                    print("\tTry mic")
                    self.recognizer.adjust_for_ambient_noise(mic, duration=1)
                    audio = self.recognizer.listen(mic)
                    
                    text = self.recognizer.recognize_google(audio).lower()
                    
                    print("Tan: ", text);

                    if "hello world" in text:
                        self.label.config(fg="green")
                        audio = self.recognizer.listen(mic)
                        text = self.recognizer.recognize_google(audio)
                        text = text.lower()
                        
                        print("Next Tan:", text)
                        
                        if text == "stop":
                            self.speaker.say("Bye Sovi")
                            self.speaker.runAndWait()
                            self.speaker.stop()
                            self.root.destroy()
                            return sys.exit(0)
                            
                        elif text is not None:
                            print("Here")
                            response = self.assistant.request(text)
                            if response is not None:
                                print("Response", response)
                                self.speaker.say(response)
                    
            except Exception as e:
                print(e)
                print("Something wrong")
                continue


Assistant()