import os
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path('../../.env')
load_dotenv(dotenv_path=dotenv_path)

# Import library and create instance of REST client.
from Adafruit_IO import Client

AIO_USERNAME = os.getenv('AIO_USERNAME')
AIO_KEY = os.getenv('AIO_KEY')
print(AIO_USERNAME, AIO_KEY)

aio = Client(AIO_USERNAME, AIO_KEY)

# Get list of feeds.
feeds = aio.feeds()

# Print out the feed names:
for f in feeds:
    print(f)