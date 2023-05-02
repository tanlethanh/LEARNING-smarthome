from nltk.stem import WordNetLemmatizer
from nltk.parse import load_parser
from nltk import Tree

print("-------- package imported --------")

lemmartizer = WordNetLemmatizer()

cp = load_parser(grammar_url='./grammar.fcfg')

print(cp.grammar())

print("-------- parser loaded --------")

special_token = [
    'turn on',
    'turn off',
    'living room',
    'bed room',
    'air conditioner'
]

def processing_text(text: str):
    text = text.lower()
    text = ' '.join([lemmartizer.lemmatize(word) for word in text.split()])

    for tok in special_token:
        text = text.replace(tok, '_'.join(tok.split()))
    
    return text.split()    

def parse_command(tokens: list[str]):
    res = cp.parse_one(tokens)

    if isinstance(res, Tree):
        return res.label()['SEM']

    return None

    
    