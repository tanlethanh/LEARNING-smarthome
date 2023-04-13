import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AirConditionerScreen from "./AirConditioner";
import FanScreen from "./Fan";
import LampScreen from "./Lamp";
import LockScreen from "./Lock";
import TabBar from "./TabBar";
// import Config from 'react-native-config'
import { Fan } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { HTTPClient, MQTTClient } from "../../adafruitJS/client"
// import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';
const DeviceTab = createBottomTabNavigator();

// const username = REACT_APP_AIO_USERNAME;
// const key = REACT_APP_AIO_KEY;

// export const DeviceContext = createContext(null)
// const mqttClient = new MQTTClient(username, key);
// const httpClient = new HTTPClient(username, key);

// console.log("Construct client");
function DeviceScreen({ navigator }) {
    // const [fanValue, setFanValue] = useState(2)
    // const [lampValue, setLampValue] = useState(50)
    // const [feeds, setFeeds] = useState([])
    // const device = {
    //     fanValue: fanValue,
    //     setFanValue:  setFanValue,
    //     lampValue: lampValue,
    //     setLampValue: setLampValue,
    //     feeds: feeds,
    //     mqttClient: mqttClient,
    //     httpClient: httpClient,
    // }
    // const handleOnMessage = (topic, message) => {
    //     // console.log("topic: ",topic);
    //     const destinationName = topic.destinationName;
    //     // console.log(destinationName);
    //     const arr = destinationName.split('/').at(-1)
    //     console.log(arr);
    // }
    // useEffect(() => {
    //     const getConnect = async() => {

    //         const feeds = await httpClient.Feeds.getFeeds();
    //         // console.log(feeds);
    //         setFeeds(feeds)
    //         console.log("Get feeds");
    //         try {
    //             await mqttClient.connect();
    //         } catch (err) {
    //             console.log(err);
    //         }
    //         feeds.map(async (feed) => {
    //             await mqttClient.subcribeFeed(feed.id)
    //         })
    //         // feedid = feeds.find(o => o.key == 'aiot-light').id;
    //         // await mqttClient.subcribeFeed(feedid);
    //         mqttClient.onMessage(handleOnMessage);
    //     }
    //     getConnect();
    // }, []);
    // // useEffect(()=> {
    const customCompare = (oldList, newList) => oldList === newList;
    const devices = useSelector(
        (state) => state.devices.devicesList,
        customCompare,
    );
    return (
        <>
            {devices.length != 0 ? (
                <DeviceTab.Navigator
                    // initialRouteName="fan"
                    screenOptions={{
                        headerShown: false,
                    }}
                    tabBar={(props) => <TabBar {...props} />}
                >
                    {devices.map((device) => {
                        if (device.deviceName === "AIOT_FAN") {
                            return (
                                <DeviceTab.Screen
                                    key={device.deviceId}
                                    name={
                                        device.deviceName +
                                        device.deviceId +
                                        device.key
                                    }
                                    component={FanScreen}
                                    initialParams={{
                                        deviceId: device.deviceId,
                                    }}
                                ></DeviceTab.Screen>
                            );
                        } else if (device.deviceName === "AIOT_LIGHT") {
                            return (
                                <DeviceTab.Screen
                                    key={device.deviceId}
                                    name={
                                        device.deviceName +
                                        device.deviceId +
                                        device.key
                                    }
                                    component={LampScreen}
                                    initialParams={{
                                        deviceId: device.deviceId,
                                    }}
                                ></DeviceTab.Screen>
                            );
                        }
                    })}
                </DeviceTab.Navigator>
            ) : (
                <></>
            )}
        </>
    );
}

export { DeviceScreen };
