import requests
import json

# Sample body
# {
#     "feedId": "smarthome.lr-aircond",
#     "value": 4,
#     "time": "2023-04-04T10:10:00.000Z"
# }

def addScheduling(feed_key, value, time):
    url = "http://localhost:8080/api/v1/scheduling?option"

    payload = json.dumps({
        "feedId": feed_key,
        "value": value,
        "time": time
    })
    
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    
    return response.text