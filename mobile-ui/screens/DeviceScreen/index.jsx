import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import TabBar from './TabBar'
// import Config from 'react-native-config'
import { Fan } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

import { AirConditionerScreen } from './AirConditioner'
import { DevicesScreen } from './DevicesScreen'
import { FanScreen } from './Fan'
import { LampScreen } from './Lamp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { HTTPClient, MQTTClient } from "../../adafruitJS/client"
// import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';
const DeviceTab = createBottomTabNavigator()
const DeviceStack = createNativeStackNavigator()

const DeviceScreen = () => {
    return (
        <DeviceStack.Navigator>
            <DeviceStack.Screen name="DeviceHome" options={{ headerShown: false }} component={DevicesScreen}/>
            <DeviceStack.Screen name="FanScreen" options={{ headerShown: false }} component={FanScreen}/>
            <DeviceStack.Screen name="AirConditionScreen" options={{ headerShown: false }} component={AirConditionerScreen}/>
            <DeviceStack.Screen name="LampScreen" options={{ headerShown: false }} component={LampScreen}/>
        </DeviceStack.Navigator>
    )
}

export { DeviceScreen }
