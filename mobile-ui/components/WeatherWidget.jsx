import * as Location from 'expo-location'
import { Text, View } from 'react-native'
// import { dailyForecast, getWeather, showWeather } from 'react-native-weather-api'
import { Cloud } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
const WeatherWidget = (props) => {
    return (
        <View className = {'h-[106px] w-full rounded-[22px] p-[14px] bg-slate-400 '.concat(props.className)}>
            <View className="flex flex-row justify-between w-full p-0 flex-1">
                <View className="flex-[2]">
                    <Text className="font-[700] text-[18px] text-[#141414]">My Location</Text>
                    <Text className="font-[600] text-[15px] text-[#141414]">Ho Chi Minh</Text>
                </View>
                <View className="flex-[1] flex flex-col items-center justify-center w-fit">
                    <Text className="text-[33px] font-bold text-[#011638]">28°</Text>
                </View>
            </View>
            <View className="flex-row gap-3.5 items-center justify-start">
                <Cloud/>
                <Text className="text-[#011638]">Partly Cloudy</Text>
            </View>
        </View>
    )
}
export { WeatherWidget }
