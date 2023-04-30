# Smart home

## Features
- IoT gateway: Connect to IoT device
- Adafruit client
- Mobile Application: React Native app
- Scheduling service: NodeJS server
- AI service: Voice assistant to controll IoT device

## Required .env
Add .env file in root directory
```
AIO_USERNAME='soviteam'
AIO_KEY=''

SCHE_PORT=8080
SCHE_DB_URI="mongodb://127.0.0.1/scheduling-service"
```

### scheduling/settings.json
This file is used to config scheduling service including mode
- With 'dev' mode: action will be triggered after 2s for each request
- Otherwise, use time field in request body


## API references for Scheduling service
https://api.postman.com/collections/24750708-80fe99f2-35a3-487e-85f8-32dee60125e7?access_key=PMAT-01GZ8QY95AGWPJZBN0B7MAS9VP
