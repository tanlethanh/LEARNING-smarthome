import { Alert, Image, Text, View, ViewBase } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import ToggleSwitch from 'toggle-switch-react-native'

function Lock ({ LockState }) {
    const [isLock, setIsLock] = useState(LockState)
    const toggleState = () => {
        setIsLock((previousState) => !previousState)
        // alert("Toggled")
    }
    return (
        <View className="flex flex-col w-full h-full items-center bg-white py-5">
            <View className="flex flex-row justify-between items-center px-2.5 w-full">
                <Text className="font-semibold text-gray-700 text-xl">
                    {isLock ? 'On' : 'Off'}
                </Text>
                <ToggleSwitch
                    isLock={isLock}
                    onToggle={toggleState}
                ></ToggleSwitch>
            </View>
            <View className="flex justify-center items-center w-72 h-72">
                <Image
                    className="w-52 h-52 mix-blend-multiply"
                    source={require('../assets/lamp.png')}
                ></Image>
            </View>
            <Text>Current state: {isLock}</Text>
            <View className="flex flex-row justify-center items-center w-full h-20 gap-3"></View>
        </View>
    )
}
export { Lock }
