from pymongo import MongoClient
import datetime

client = MongoClient("mongodb://localhost:27017/")
database = client["IotApp"]

class User:
    def __init__(self,firstName, lastName, iden, sex, userName, passWord):
        self.firstName = firstName
        self.lastName = lastName
        self.iden = iden
        self.sex = sex
        self.userName = userName
        self.passWord = passWord

def insertData_IotDevice (value, deviceName):
    now = datetime.datetime.now()
    collection = database["Devices"]
    data = {
        "typeName": deviceName,
        "time": {
            "hour": now.hour,
            "day": now.day,
            "month": now.month,
            "year": now.year
        },
        "value": value
    }
    collection.insert_one(data)

def insertData_IotUser (newClient: User):
    collection = database["Users"]
    data = {
        "name": {
            "firstName": newClient.firstName,
            "lastName": newClient.lastName
        },
        "identityCard": newClient.iden,
        "sex": newClient.sex,
        "userName": newClient.userName,
        "passWord": newClient.passWord
    }
    collection.insert_one(data)
    
def getData_IotDevice (query = {},field = {}):    
    collection = database["Devices"]
    data = collection.find(query,field)    
    return data

def getData_IotUser (query = {},field = {}):    
    collection = database["Users"]
    data = collection.find(query,field)    
    return data    

# insertData_IotDevice(28,'Temperature')
# insertData_IotDevice(35,'Humidity')
print('hello')
dat = getData_IotDevice(query={"typeName" : "Humidity"},field={"_id" : 0})
for x in dat:
    print(x)

    


