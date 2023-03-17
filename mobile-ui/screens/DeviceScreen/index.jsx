import FanScreen from "./Fan";
import AirConditionerScreen from "./AirConditioner";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
// import { adafruitClient } from "../../hooks/adafruit";

import { useEffect, useState } from "react";
// import { Client } from "../../hooks/adafruit";
// import {HTTPClient, MQTTClient} from "../../adafruitJS/client"
const DeviceTab = createBottomTabNavigator();

// const username = "pvbt2002";
// const key = "aio_qyCi55L35J5zcVd15j6gpfIYYwd7";
// const mqttClient = new MQTTClient(username, key);
// const httpClient = new HTTPClient(username, key);
console.log("Construct client");
function DeviceScreen({ navigator }) {
    const [message, setMessage] = useState(null)
    const [fanValue, setFanValue] = useState(0)
    useEffect(() => {
        // const feeds = await httpClient.Feeds.getFeeds();
        console.log("Get feeds");
        // await mqttClient.connect();
        console.log("Connect mqtt");
        const simulate = () => {
            setTimeout(()=> {
                const receivedData = Math.floor(Math.random() * 100);
                console.log("New fan value: ", receivedData);
                setFanValue(receivedData)
            }, 3000)
        }
        simulate();
        // mqttClient.onMessage((topic, message) => {
        //     const arr = topic.split('/')
        //     const id = arr.pop()
        //     const devicename = feeds.find(object.id == id)
        //     if (devicename == 'AIOT_FAN') {
        //         setFanValue(message)
        //     }
        // })
        // return () => {
        //     mqttClient.end();
        // }
    }, []);
    const Fancallback = (newvalue) => {
        setFanValue(newvalue)
    }
    FanScreen.navigationOptions = {"fanValue": fanValue}
    return (
        <DeviceTab.Navigator
            initialRouteName="fan"
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <DeviceTab.Screen
                name="Air conditioner"
                component={AirConditionerScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Fan"
                component={FanScreen}
                options={
                    // {
                //     // "feed": feeds.find(object => object.key=="aiot-fan"),
                //     // "mqttClient": mqttClient,
                //     "fanValue": fanValue
                // }
            FanScreen.navigationOptions}
            initialParams={{
                fanValue: fanValue,
                callback: Fancallback
            }}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Light 2"
                component={FanScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Light 1"
                component={FanScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Machine"
                component={FanScreen}
            ></DeviceTab.Screen>
        </DeviceTab.Navigator>
    );
}

export { DeviceScreen };
