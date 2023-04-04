import * as Location from 'expo-location'
import { Image, Pressable, Text, View } from 'react-native'
// import { dailyForecast, getWeather, showWeather } from 'react-native-weather-api'
import React, { useEffect, useState } from 'react'

const EnergyWidget = (props) => {
    return (
        <Pressable className ={'h-[106px] w-full rounded-[22px] p-[14px] bg-[#EEC643] '.concat(props.className)}>
            <View className="flex flex-row flex-1 justify-between">
                <View className='flex-[2] '>
                    <Text className="font-[700] text-[15px] text-[#EEF0F2]">Energy Saving</Text>
                    <Text className="font-bold  text-[28px] text-[#609966]">+35%</Text>
                </View>
                <View className="flex-[1] flex flex-col items-center justify-center ">
                    <Image resizeMode='cover'source={require('../assets/energy.png')}></Image>
                </View>
            </View>
            <View className="flex-row items-center justify-start">
                <Text className="text-[#EEF0F2]">223.5kwH</Text>
            </View>
        </Pressable>
    )
}
export { EnergyWidget }
