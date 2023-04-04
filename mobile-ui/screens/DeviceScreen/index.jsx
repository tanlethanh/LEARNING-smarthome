import React from 'react'

import { AirConditionerScreen } from './AirConditioner'
import { DevicesScreen } from './DevicesScreen'
import { FanScreen } from './Fan'
import { LampScreen } from './Lamp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
