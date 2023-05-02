from command import processing_text, parse_command
import sys

while True: 
    text = input("Type your command: ")

    if text == 'exits':
        sys.exit()
    
    processed_text = processing_text(text)
    
    print(processed_text)
    
    result = parse_command(processed_text)
    print("Response: {}".format(result))