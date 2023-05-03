import speech_recognition as sr
import traceback
import pyttsx3
from utils.openaiapi import to_text
WAKE = "hello"
STOP = "stop"
TERMINATE = "goodbye"

prompt = "Image you're a polite and friendly assistant in my iot app.\
         Your'name is Sovi and you will help me to transribe text of my voice request.\
             I often ask about devices in my home, about some social information.\
                 I'm vietnamese so my accent maybe different. Please try to transribe. Thank you"
def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()
    
def get_audio(duration = 0.2):
    r = sr.Recognizer()
    said = ""
    try:
        with sr.Microphone() as source:
            print('access get audio')
            # r.adjust_for_ambient_noise(source, duration=1)
            # import time
            # time.sleep(duration)
            print("Sovi is listening...")
            audio = r.listen(source)
            print('...listened')
            # said = to_text(audio,prompt)
            # if said == ".":
            said = r.recognize_google(audio)
            
    except Exception as e:
        # print(traceback.format_exc())
        print("Exception: " + str(e))

    return said.lower()

if __name__ == "__main__":
    text = get_audio()
    print(text)