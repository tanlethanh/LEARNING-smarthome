import FanScreen from "./Fan";
import LampScreen from './Lamp'
import AirConditionerScreen from "./AirConditioner";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";

import { useEffect, useState, useContext, createContext } from "react";
// import { Client } from "../../hooks/adafruit";
import { HTTPClient, MQTTClient } from "../../adafruitJS/client"
import mqtt from "sp-react-native-mqtt";
const DeviceTab = createBottomTabNavigator();

const username = "pvbt2002";
const key = "aio_qyCi55L35J5zcVd15j6gpfIYYwd7";
const mqttClient = new MQTTClient(username, key);
const httpClient = new HTTPClient(username, key);
export const DeviceContext = createContext(null)
console.log("Construct client");
function DeviceScreen({ navigator }) {
    const [message, setMessage] = useState(null)
    const [fanValue, setFanValue] = useState(2)
    const [lampValue, setLampValue] = useState(50)
    const [feeds, setFeeds] = useState([])
    const device = {
        fanValue: fanValue,
        setFanValue:  setFanValue,
        lampValue: lampValue,
        setLampValue: setLampValue,
        feeds: feeds,
        mqttClient: mqttClient,
        httpClient: httpClient,
    }

    useEffect(() => {
        const getConnect = async() => {
            const feeds = await httpClient.Feeds.getFeeds();
            // console.log(feeds);
            setFeeds(feeds)
            console.log("Get feeds");
            try {
                await mqttClient.connect();
            } catch (err) {
                console.log(err);
            }
            feedid = feeds.find(o => o.key == 'aiot-light').id
            await mqttClient.subcribeFeed(feedid)
            // feeds.map(async (feed)=> {
            // if (feed.key === 'aiot-fan' || feed.key === 'aiot-fan') {
            //     await mqttClient.subcribeFeed(feed.id);
            //     console.log("Sub", feed.id);
            //     }
            // })
        }
        getConnect();
        // const simulate = () => {
        //     setInterval(() => {
        //         const receivedData = Math.floor(Math.random() * 3);
        //         console.log("New fan value: ", receivedData);
        //         setFanValue(receivedData);
        //         console.log("Current fan", fanValue);
        //     }, 3000)
        // }
        // simulate();
        mqttClient.onMessage((topic, message) => {
            const arr = topic.split('/')
            const id = arr.pop()
            const deviceKey = feeds.find(object => object.id == id).key
            if (deviceKey == 'aiot-fan') {
                setFanValue(message)
            }
            // } else if (deviceKey == 'aiot-light') {
            //     setLampValue(message)
            // }
        })
        // return () => {
        //     mqttClient.end();
        // }
    }, []);
    return (
        <DeviceContext.Provider value={device}>
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
                ></DeviceTab.Screen>
                <DeviceTab.Screen
                    name="Light"
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
        </DeviceContext.Provider>
    );
}

export { DeviceScreen };
