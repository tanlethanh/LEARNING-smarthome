from command import processing_text, parse_command
import sys
import json
from pathlib import Path
from adafruit import getAllFeeds, updateFeed

f = open("../mapping.json")
mapping = json.load(f)

def handle_command(cmd):
    # Sample: {'Ac': 'turn_on', 'De': 'air_conditioner', 'Pos': 'living_room'}
    action = mapping["actions"].get(cmd.get("Ac"))
    if action is None:
        return "I don't understand the action, can you repeat again!"
    
    device = mapping["devices"].get(cmd.get("De"))
    room = mapping["rooms"].get(cmd.get("Pos"))
    name = "_".join([room, device])

    feeds = getAllFeeds()
    f_names = [f.name for f in feeds]

    if name in f_names:
        for f in feeds:
            if f.name == name:
                key = f.key
                value = action.get("value")
                updateFeed(key, value)
                return "Yes sir! The {} in {} is {}".format(" ".join(cmd.get("Pos").split("_")), " ".join(cmd.get("De").split("_")),  " ".join(cmd.get("Ac").split("_")))
        return "Some thing wrong"
        
    else:
        for fn in f_names:
            if room in fn:
                return "Sorry! The {} doesn't have {} device".format(" ".join(cmd.get("Pos").split("_")), " ".join(cmd.get("De").split("_")))
        return "Sorry! Are you sure that {} is a place in our hourse".format(" ".join(cmd.get("Pos").split("_")))
    

while True: 
    text = input("Type your command: ")

    if text == 'exits':
        sys.exit()
    
    processed_text = processing_text(text)
    result = parse_command(processed_text)
    print("Parsed: {}".format(result))

    if result is None:
        print("Res: I dont understand, can you repeat")

    res = handle_command(result)
    print("Res: {}".format(res))
        
