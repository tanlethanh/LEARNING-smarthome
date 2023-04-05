import * as Location from 'expo-location'
import { Text, View } from 'react-native'
// import { dailyForecast, getWeather, showWeather } from 'react-native-weather-api'
import { Cloud } from '@tamagui/lucide-icons'
import { LinearGradient } from 'tamagui/linear-gradient'
// import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
const WeatherWidget = (props) => {
    return (
        <View
            className = {'h-[106px] w-full rounded-[22px] overflow-hidden '.concat(props.className)}
            style ={{
                // backgroundColor: 'white',
                backgroundColor: '#EAEAEA',
                borderRadius: 8,
                width: '100%',
                elevation: 30,
                shadowColor: 'black'
            }}
        >
            <LinearGradient
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                colors={['#00FFF0', '#0029FF']}
                start={[0, 0]}
                end={[1, 1]}
            >
                {/* //  className='w-full h-full' start={[0, 0]} end={[1, 1]} color={['purple', 'pink', 'blue']}> */}
                <View className="w-full h-full p-3">
                    <View className="flex flex-row justify-between w-full p-0 flex-1">
                        <View className="flex-[2]">
                            <Text className="font-[700] text-[15px] text-[#FFFFFF]">My Location</Text>
                            <Text className="font-[600] text-[15px] text-[white]/[.7]">Ho Chi Minh</Text>
                        </View>
                        <View className="flex-[1] flex flex-col items-center justify-center w-fit">
                            <Text className="text-[33px] font-bold text-[#FFFFFF]">28°</Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3.5 items-center justify-start">
                        <Cloud color='#FFFFFF'/>
                        <Text className="text-[#FFFFFF]">Partly Cloudy</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
export { WeatherWidget }
