from utils.command import processing_text, parse_command, handle_command
import sys



while True: 
    text = input("Type your command: ")

    if text == 'exits':
        sys.exit()
    
    processed_text = processing_text(text)
    result = parse_command(processed_text)
    print("Parsed: {}".format(result))

    if result is None:
        print("Res: I dont understand, can you repeat")
        continue

    res = handle_command(result)
    print("Res: {}".format(res))
        
