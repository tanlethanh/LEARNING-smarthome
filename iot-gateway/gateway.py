import serial.tools.list_ports
import time
import  sys
from  Adafruit_IO import  MQTTClient
from dotenv import *

AIO_FEED_IDS = ["lr-aircond","lr-aircond-auto", "lr-fan", "lr-humi", "lr-light", "lr-light-auto", "lr-lock", "lr-temp"]

AIO_USERNAME = "soviteam"
AIO_KEY = ""

def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe("smarthome." + feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print(feed_id + " nhan du lieu: " + payload)
    if isMicrobitConnected:
        print(feed_id)
        if(feed_id ==  "smarthome.lr-light"):
            print("hello")
            if(str(payload) == "0"):
                ser.write(("A").encode())
            elif(str(payload) == "1"):
                ser.write(("B").encode())
            elif(str(payload) == "2"):
                ser.write(("C").encode())
            elif(str(payload) == "3"):
                ser.write(("D").encode())
            elif(str(payload) == "4"):
                ser.write(("E").encode())
        elif(feed_id == "smarthome.lr-fan"):
            if(str(payload) == "0"): ser.write(("H").encode())
            elif(str(payload) == "1"): ser.write(("I").encode())
            elif(str(payload) == "2"): ser.write(("J").encode())
            elif(str(payload) == "3"): ser.write(("K").encode())
        elif(feed_id == "smarthome.lr-light-auto"):
            if(str(payload) == "1"): ser.write(("G").encode())
            elif(str(payload) == "0"): ser.write(("F").encode())
        elif(feed_id == "smarthome.lr-lock"):
            if(str(payload) == "1"): ser.write(("L").encode())
            elif(str(payload) == "0"): ser.write(("M").encode())
        elif(feed_id == "smarthome.lr-aircond-auto"):
            if(str(payload) == "1"): ser.write(("R").encode())
            elif(str(payload) == "0"): ser.write(("Q").encode())
        elif(feed_id == "smarthome.lr-aircond"):
            ser.write(("P").encode())
            ser.write(str(int(payload)/10).encode())
            ser.write(str(int(payload)%10).encode())

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
ser = serial.Serial( port="COM3", baudrate=115200)
isMicrobitConnected = True
print("Connect to yolobit!")


def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[0] == "TEMP":
            client.publish("smarthome.lr-temp", splitData[1])
        elif splitData[0] == "HUMI":
            client.publish("smarthome.lr-humi", splitData[1])
        elif splitData[0] == "LIGHT":
            client.publish("smarthome.lr-light", splitData[1])
        elif splitData[0] == "LOCK":
            client.publish("smarthome.lr-lock", splitData[1])
        elif splitData[0] == "LIGHT_AUTO":
            client.publish("smarthome.lr-light-auto", splitData[1])
        elif splitData[0] == "FAN":
            client.publish("smarthome.lr-fan", splitData[1])
        elif splitData[0] == "AIR":
            client.publish("smarthome.lr-aircond", splitData[1])
        elif splitData[0] == "AIR_AUTO":
            client.publish("smarthome.lr-aircond-auto", splitData[1])
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