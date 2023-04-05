import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import TabBar from './TabBar'
// import Config from 'react-native-config'
import { AirConditionerScreen } from './AirConditioner'
import { DevicesScreen } from './DevicesScreen'
import { Fan } from '../../components'
import { FanScreen } from './Fan'
import { LampScreen } from './Lamp'
import { LockScreen } from './Lock'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
// import { HTTPClient, MQTTClient } from "../../adafruitJS/client"
// import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';
const DeviceTab = createBottomTabNavigator()
const DeviceStack = createNativeStackNavigator()

const DeviceScreen = () => {
    const customCompare = (oldList, newList) => oldList === newList
    let devices = useSelector(
        (state) => state.devices.devicesList,
        customCompare
    )
    devices = [
        {
            type: 'fan',
            name: 'AIOT_FAN'
        },
        {
            type: 'lamp',
            name: 'AIOT_LAMP'
        },
        {
            type: 'air',
            name: 'AIOT_AIR'
        },
        {
            type: 'lock',
            name: 'AIOT_LOCK'
        }
    ]
    const getScreen = (device) => {
        if (device.type == 'fan') {
            return FanScreen
        } else if (device.type == 'air') {
            return AirConditionerScreen
        } else if (device.type == 'lamp') {
            return LampScreen
        }
        return LockScreen
    }
    return (
        <DeviceStack.Navigator initialRouteName='DeviceHome'>
            <DeviceStack.Screen name="DeviceHome" options={{ headerShown: false }} component={DevicesScreen}/>
            {devices.map((device, index) => (
                <DeviceStack.Screen key={'screen' + index} name={device.name} options = {{ headerShown: false }} component={getScreen(device)}/>
            ))}
        </DeviceStack.Navigator>
    )
}

export { DeviceScreen }
