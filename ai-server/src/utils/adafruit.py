import os
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path('../../../.env')
load_dotenv(dotenv_path=dotenv_path)

# Import library and create instance of REST client.
from Adafruit_IO import Client, Data

AIO_USERNAME = os.getenv('AIO_USERNAME')
AIO_KEY = os.getenv('AIO_KEY')
print(AIO_USERNAME, AIO_KEY)

aio = Client(AIO_USERNAME, AIO_KEY)

def getAllFeeds():
    return aio.feeds()

def updateFeed(feed_key, value):
    return aio.create_data(feed_key, Data(value=value))