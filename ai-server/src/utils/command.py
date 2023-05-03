from nltk.stem import WordNetLemmatizer
from nltk.parse import load_parser
from nltk import data
from nltk import Tree
import json

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
