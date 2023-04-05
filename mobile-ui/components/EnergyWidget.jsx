import * as Location from 'expo-location'
import { Image, Pressable, Text, View } from 'react-native'
// import { dailyForecast, getWeather, showWeather } from 'react-native-weather-api'
import React, { useEffect, useState } from 'react'

const EnergyWidget = (props) => {
    return (
        <Pressable
            className ={'h-[106px] w-full rounded-[22px] px-[21px] pt-[16px] pb-[14px] '.concat(props.className)}
            style ={{
                backgroundColor: '#EAEAEA',
                borderRadius: 8,
                width: '100%',
                elevation: 20,
                shadowColor: 'black'
            }}>
            <View className="flex flex-row flex-1 justify-between items-center">
                <View className='flex-[2] flex flex-col items-start gap-[5px] '>
                    <Text className="font-[700] text-[14px] text-[#191919]">Energy Saving</Text>
                    <Text className="font-[700]  text-[24px] text-[#15b342]">+35%</Text>
                    <Text className="text-[#838A8F]">223.5 kwH</Text>
                </View>
                <View className="flex-[1] flex flex-col items-center justify-center pt-4 ">
                    <Image resizeMode='cover'source={require('../assets/energy.png')}></Image>
                </View>
            </View>
        </Pressable>
    )
}
export { EnergyWidget }
