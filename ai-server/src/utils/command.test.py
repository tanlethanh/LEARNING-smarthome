from command import processing_text, parse_command
import sys
import json
from adafruit import getAllFeeds, updateFeed
from scheduling import addScheduling
from datetime import datetime, timedelta, timezone

f = open("../mapping.json")
mapping = json.load(f)

def handle_command(cmd):
    # Sample: {'Ac': 'turn_on', 'De': 'air_conditioner', 'Pos': 'living_room'}
    action = mapping["actions"].get(cmd.get("Ac"))
    if action is None:
        return "I don't understand the action, can you repeat again!"
    
    action_str = " ".join(cmd.get("Ac").split("_"))
    
    device = mapping["devices"].get(cmd.get("De"))
    device_str = " ".join(cmd.get("De").split("_"))

    room = mapping["rooms"].get(cmd.get("Pos"))
    room_str = " ".join(cmd.get("Pos").split("_"))
    name = "_".join([room, device])

    feeds = getAllFeeds()
    f_names = [f.name for f in feeds]
    
    time = cmd.get("Ti")

    if name in f_names:
        for f in feeds:
            if f.name == name:
                key = f.key
                value = action.get("value")
                
                if time is not None:
                    now = datetime.now(timezone.utc)
                    if time['type'] == 'second':
                        now += timedelta(seconds=time['num'])
                    elif time['type'] == 'minute':
                        now += timedelta(minutes=time['num'])
                    elif time['type'] == 'hour':
                        now += timedelta(hours=time['num'])
                    
                    try:
                        addScheduling(f.key, value, now.isoformat())
                        return "Alright! The {} in {} will be {} after {} {}".format(device_str, room_str, action_str, time['num'], time['type'])
                    except Exception as e:
                        print("Send scheduling request error ", e)
                        return "Some thing go wrong, I can not set scheduling for you"
                    
                else:
                    updateFeed(key, value)
                    return "Yes sir! The {} in {} is {}".format(device_str, room_str,  action_str)
                
        return "Some thing wrong"
        
    else:
        for fn in f_names:
            if room in fn:
                return "Sorry! The {} doesn't have {} device".format(room_str, device_str)
        return "Sorry! Are you sure that {} is a place in our hourse".format(room_str)
        

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
        
