import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import TabBar from "./TabBar";
// import Config from 'react-native-config'
import { AirConditionerScreen } from "./AirConditioner";
import { DevicesScreen } from "./Devices";
import { Fan } from "../../components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import FanScreen from "./Fan";
import LampScreen from "./Lamp";
import LockScreen from "./Lock";
// import { HTTPClient, MQTTClient } from "../../adafruitJS/client"
// import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';
const DeviceTab = createBottomTabNavigator();
const DeviceStack = createNativeStackNavigator();

const DeviceScreen = () => {
    const customCompare = (oldList, newList) => oldList === newList;
    let devices = useSelector(
        (state) => state.devices.devicesList,
        customCompare,
    );
    // UseSelector to get list devices
    devices = [
        {
            deviceName: "AIOT_FAN",
            key: "1",
            deviceId: "1234",
            type: "lamp",
            favorite: true,
            name: "Lamp",
            status: false,
            screenName: "AIOT_FAN",
            roomId: 1,
        },
        {
            deviceName: "AIOT_FAN",
            key: "2",
            deviceId: "12355",
            type: "fan",
            name: "Fan",
            status: true,
            screenName: "AIOT_FAN",
            roomId: 1,
        },
        {
            deviceName: "AIOT_FAN",
            key: "3",
            deviceId: "1234",
            type: "air",
            name: "Air condition",
            status: true,
            screenName: "AIOT_FAN",
            roomId: 1,
        },
        {
            deviceName: "AIOT_FAN",
            key: "4",
            deviceId: "1234",
            type: "lock",
            name: "Lock",
            favorite: true,
            status: true,
            screenName: "AIOT_FAN",
            roomId: 1,
        },
        {
            deviceName: "AIOT_FAN",
            key: "5",
            deviceId: "1234",
            type: "lamp",
            favorite: true,
            name: "Lamp",
            status: false,
            screenName: "AIOT_FAN",
            roomId: 2,
        },
        {
            deviceName: "AIOT_FAN",
            key: "6",
            deviceId: "125412",
            type: "fan",
            name: "Fan",
            status: true,
            screenName: "AIOT_FAN",
            roomId: 2,
        },
        {
            deviceName: "AIOT_FAN",
            key: "7",
            deviceId: "1234",
            type: "air",
            name: "Air condition",
            status: true,
            screenName: "AIOT_FAN",
            roomId: 2,
        },
        {
            deviceName: "AIOT_FAN",
            key: "8",
            deviceId: "1234",
            type: "lock",
            name: "Lock",
            favorite: true,
            status: true,
            screenName: "AIOT_FAN",
            roomId: 2,
        },
        {
            deviceName: "AIOT_FAN",
            key: "9",
            deviceId: "1234",
            type: "lamp",
            favorite: true,
            name: "Lamp",
            status: false,
            screenName: "AIOT_FAN",
            roomId: 2,
        },
        {
            deviceName: "AIOT_FAN",
            key: "10",
            deviceId: "122524",
            type: "fan",
            name: "Fan",
            status: true,
            screenName: "AIOT_FAN",
            roomId: 3,
        },
        {
            deviceName: "AIOT_FAN",
            key: "11",
            deviceId: "1234",
            type: "air",
            name: "Air condition",
            status: true,
            screenName: "AIOT_FAN",
            roomId: 3,
        },
    ];

    const getScreen = (device) => {
        if (device.type == "fan") {
            return FanScreen;
        } else if (device.type == "air") {
            return AirConditionerScreen;
        } else if (device.type == "lamp") {
            return LampScreen;
        }
        return LockScreen;
    };
    return (
        <DeviceStack.Navigator initialRouteName="DeviceHome">
            <DeviceStack.Screen
                name="DeviceHome"
                options={{ headerShown: false }}
                component={DevicesScreen}
            />
            {devices.map((device, index) => (
                <DeviceStack.Screen
                    key={"screen" + index}
                    name={device.deviceName + device.key}
                    options={{ headerShown: false }}
                    component={getScreen(device)}
                    initialParams={{
                        deviceId: device.deviceId,
                    }}
                />
            ))}
        </DeviceStack.Navigator>
    );
};

export { DeviceScreen };
