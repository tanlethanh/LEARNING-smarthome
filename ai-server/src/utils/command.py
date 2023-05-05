from nltk.stem import WordNetLemmatizer
from nltk.parse import load_parser
from nltk import Tree
import json
from utils.adafruit import getAllFeeds, updateFeed
from utils.scheduling import addScheduling
from datetime import datetime, timedelta, timezone

print("-------- package imported --------")

lemmartizer = WordNetLemmatizer()
cp = load_parser(grammar_url='../grammar.fcfg')

# print(cp.grammar())

rules = cp.grammar()._productions
terminal_nodes = []
for rule in rules:
    ls = list(rule.rhs())
    for node in ls:
        if isinstance(node, str):
            terminal_nodes += [" ".join(node.split("_"))]
            
accepted_token = ['_'.join(tok.split()) for tok in terminal_nodes]

print("-------- parser loaded --------")

def processing_text(text: str):
    text = text.lower()
    text = ' '.join([lemmartizer.lemmatize(word) for word in text.split()])

    for tok in terminal_nodes:
        text = text.replace(tok, '_'.join(tok.split()))
        
    tokens = text.split()
    filtered_tokens = [tok for tok in tokens if tok in accepted_token]

    return filtered_tokens  

def parse_command(tokens: list[str]):
    try:
        res = cp.parse_one(tokens)
        if isinstance(res, Tree):
            json_str = "".join(res.label()['SEM'])
            print(json_str)
            return json.loads(json_str) 
    except Exception as e:
        print("Cannot parse ", e)

    return None


f = open("./mapping.json")
mapping = json.load(f)

def handle_command(cmd):
    # Sample: {'Ac': 'turn_on', 'De': 'air_conditioner', 'Pos': 'living_room'}
    action = mapping["actions"].get(cmd.get("Ac"))
    if action is None:
        return "I don't understand the action, can you repeat again!"
    
    action_str = " ".join(cmd.get("Ac").split("_"))
    
    device = mapping["devices"].get(cmd.get("De"))

    device_str = "unknown"
    if device is not None:
        device_str = " ".join(cmd.get("De").split("_"))

    room = mapping["rooms"].get(cmd.get("Pos"))
    
    room_str = "unknown"
    if room_str is not None:
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
        
