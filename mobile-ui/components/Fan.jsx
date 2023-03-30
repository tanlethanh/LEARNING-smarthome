import { Alert, Image, Text, View, ViewBase } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import ToggleSwitch from 'toggle-switch-react-native'

function Fan ({ powerState }) {
    const [isOn, setIsOn] = useState(powerState)
    const toggleState = () => {
        if (isOn == true) {
            setpower(0)
        }
        setIsOn((previousState) => !previousState)

        // alert("Toggled")
    }
    const [power, setpower] = useState(0)
    return (
        <View className="flex flex-col w-full h-full items-center bg-white py-2 px-3">
            <View className="flex flex-row justify-between items-center px-2.5 w-full">
                <Text className="font-semibold text-gray-700 text-xl">
                    {isOn ? 'On' : 'Off'}
                </Text>
                <ToggleSwitch isOn={isOn} onToggle={toggleState}></ToggleSwitch>
            </View>
            <View className="flex justify-center items-center w-72 h-72">
                <Image
                    className="w-52 h-52 mix-blend-multiply"
                    source={require('../assets/fan.png')}
                ></Image>
            </View>
            <Text>Current level: {power}</Text>
            <View className="flex flex-row justify-center items-center w-full h-20 gap-3">
                <Text>Low</Text>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={3}
                    value={power}
                    onValueChange={(value) => {
                        setpower(value)
                    }}
                    disabled={!isOn}
                    step={1}
                ></Slider>
                <Text>High</Text>
            </View>
        </View>
    )
}
export { Fan }
