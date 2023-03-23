import FanScreen from "./Fan";
import LampScreen from './Lamp'
import AirConditionerScreen from "./AirConditioner";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
// import Config from 'react-native-config'
import { useEffect, useState, useContext, createContext } from "react";
import { HTTPClient, MQTTClient } from "../../adafruitJS/client"
import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';
import mqtt from "sp-react-native-mqtt";
const DeviceTab = createBottomTabNavigator();

const username = REACT_APP_AIO_USERNAME;
const key = REACT_APP_AIO_KEY;

export const DeviceContext = createContext(null)
const mqttClient = new MQTTClient(username, key);
const httpClient = new HTTPClient(username, key);

console.log("Construct client");
function DeviceScreen({ navigator }) {
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
    const handleOnMessage = (topic, message) => {
        // console.log("topic: ",topic);
        const destinationName = topic.destinationName;
        // console.log(destinationName);
        const arr = destinationName.split('/').at(-1)
        console.log(arr);
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
            feeds.map(async (feed) => {
                await mqttClient.subcribeFeed(feed.id)
            })
            // feedid = feeds.find(o => o.key == 'aiot-light').id;
            // await mqttClient.subcribeFeed(feedid);
            mqttClient.onMessage(handleOnMessage);
        }
        getConnect();
    }, []);
    // useEffect(()=> {
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
