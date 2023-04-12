import { Button } from 'tamagui'
import { HomeIcon, UserIcon } from 'react-native-heroicons/solid'
import { Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export default function BottomBar () {
    const navigation = useNavigation()

    return (
        <View className="h-[100px] w-full flex flex-row justify-center">
            <TouchableOpacity className="h-24 absolute top-[-6px]">
                <Image source={require('../assets/mic-icon.png')} className="flex-1 w-[null] h-[null]" resizeMode='contain'></Image>
            </TouchableOpacity>

            <View className="flex flex-row justify-between w-screen absolute bottom-0 z-0">
                <Image source={require('../assets/left-bt-bar.png')} className="w-[150px]" />
                <Image source={require('../assets/right-bt-bar.png')} className="w-[150px]" />
            </View>
            <View className="absolute top-8 left-8">
                <Button
                    icon={<HomeIcon size={28} fill={'white'}/>}
                    className="p-0 bg-transparent "
                    circular={true}
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                ></Button>
            </View>
            <View className="absolute top-8 right-8">
                <Button
                    icon={<UserIcon size={28} fill={'white'}/>}
                    className="p-0 bg-transparent "
                    circular={true}
                ></Button>
            </View>
        </View>
    )
}
