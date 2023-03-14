import serial.tools.list_ports
import time
import  sys
from  Adafruit_IO import  MQTTClient

AIO_FEED_IDS = ["aiot-light", "aiot-temp", "aiot-humi", "aiot-lock", "aiot-light-auto", "aiot-light-sensor", "aiot-fan"]


AIO_USERNAME = "pvbt2002"
AIO_KEY = "aio_JjXp80H6wRINfUXLM8nm11LBiPlB"

def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print(feed_id + " nhan du lieu: " + payload)
    if isMicrobitConnected:
        print(feed_id)
        if(feed_id == "aiot-light"):
            print("access")
            if(str(payload) == "1"): ser.write(("A").encode())
            elif(str(payload) == "0"): ser.write(("B").encode())
        elif(feed_id == "aiot-fan"):
            if(str(payload) == "100"): ser.write(("E").encode())
            elif(str(payload) == "50"): ser.write(("F").encode())
            elif(str(payload) == "0"): ser.write(("G").encode())
        elif(feed_id == "aiot-light-auto"):
            if(str(payload) == "1"): ser.write(("C").encode())
            elif(str(payload) == "0"): ser.write(("D").encode())
        elif(feed_id == "aiot-lock"):
            if(str(payload) == "1"): ser.write(("H").encode())
            elif(str(payload) == "0"): ser.write(("I").encode())

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

isMicrobitConnected = False

# if getPort() != "None":
# ser = serial.Serial( port=getPort(), baudrate=115200)
ser = serial.Serial( port="COM9", baudrate=115200)
isMicrobitConnected = True
print("Connect to yolobit!")


def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[0] == "TEMP":
            client.publish("aiot-temp", splitData[1])
        elif splitData[0] == "HUMI":
            client.publish("aiot-humi", splitData[1])
        elif splitData[0] == "LIGHT":
            client.publish("aiot-light", splitData[1])
        elif splitData[0] == "LOCK":
            client.publish("aiot-lock", splitData[1])
        elif splitData[0] == "LIGHT_AUTO":
            client.publish("aiot-light-auto", splitData[1])
        elif splitData[0] == "LIGHT_SESNOR":
            client.publish("aiot-light-sensor", splitData[1])
        elif splitData[0] == "FAN":
            client.publish("aiot-fan", splitData[1])
        elif splitData[0] == "PIR":
            pass       
    except:
        pass

mess = ""

def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

while True:
    if isMicrobitConnected:
        readSerial()
    time.sleep(1)