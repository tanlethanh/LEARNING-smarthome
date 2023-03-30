import { Image, Text, TouchableOpacity, View } from 'react-native'
// import { SvgUri } from 'react-native-svg'
// import HomeSvg from '../assets/home.svg'
import { HomeIcon, UserIcon } from 'react-native-heroicons/solid'
import { Path, Svg } from 'react-native-svg'
import React from 'react'

export default function BottomBar () {
    return (
        <View className="h-[100px] flex flex-row justify-center">
            <TouchableOpacity className="h-24 absolute top-[-6px]">
                <Image source={require('../assets/mic-icon.png')} className="flex-1 w-[null] h-[null]" resizeMode='contain'></Image>
            </TouchableOpacity>

            <View className="flex flex-row justify-between w-screen absolute bottom-0 z-0">
                <Image source={require('../assets/left-bt-bar.png')} className="w-[150px]" />
                <Image source={require('../assets/right-bt-bar.png')} className="w-[150px]" />
            </View>
            <View className="absolute top-10 left-8">
                <HomeIcon size={28} fill={'white'}/>
            </View>
            <View className="absolute top-10 right-8">
                <UserIcon size={28} fill={'white'}/>
            </View>
        </View>
    )
}
