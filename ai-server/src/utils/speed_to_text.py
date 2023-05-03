import speech_recognition as sr
import traceback
import pyttsx3
# from openaiapi import to_text
WAKE = "hello"
STOP = "stop"
TERMINATE = "goodbye"

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()
prompt = "Image you're a polite and friendly assistant in my iot app.\
         Your'name is Sovi and you will help me to transribe text of my voice request.\
             I often ask about devices in my home, about some social information. Thank you"
def get_audio(duration = 0.2):
    r = sr.Recognizer()
    said = ""
    try:
        with sr.Microphone() as source:
            r.adjust_for_ambient_noise(source, duration=duration)
            import time
            time.sleep(duration)
            print("Listening...")
            audio = r.listen(source)
            # said = to_text(audio)
            # said = r.recognize_whisper(audio,  transcribe_options={"initial_prompt":prompt})
            said = r.recognize_google(audio)
            # print(said)
    except Exception as e:
        # print(traceback.format_exc())
        print("Exception: " + str(e))

    return said.lower()

if __name__ == "__main__":
    text = get_audio()
    print(text)