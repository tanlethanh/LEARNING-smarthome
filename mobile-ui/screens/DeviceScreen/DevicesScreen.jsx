import { Avatar, Button } from 'tamagui'
import { DeviceCard } from '../../components/Device'
import { EnergyWidget } from '../../components/EnergyWidget'
import { Fan } from '../../components'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { Settings } from '@tamagui/lucide-icons'
import { WeatherWidget } from '../../components/WeatherWidget'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AirConditionerScreen from './AirConditioner'
import FanScreen from './Fan'
import LampScreen from './Lamp'
import TabBar from './TabBar'
const DeviceTab = createBottomTabNavigator()
function DevicesScreen ({ navigation }) {
    const customCompare = (oldList, newList) => oldList === newList
    // const devices = uaseSelector(
    //     (state) => state.devices.devicesList,
    //     customCompare
    // )
    const devices = [
        {
            deviceName: 'AIOT_FAN',
            key: '1',
            deviceId: '1234',
            type: 'lamp',
            favorite: true,
            name: 'Lamp',
            status: false,
            screenName: 'FanScreen'

        },
        {
            deviceName: 'AIOT_FAN',
            key: '2',
            deviceId: '1234',
            type: 'fan',
            name: 'Fan',
            status: true,
            screenName: 'FanScreen'

        },
        {
            deviceName: 'AIOT_FAN',
            key: '3',
            deviceId: '1234',
            type: 'air',
            name: 'Air condition',
            status: true,
            screenName: 'FanScreen'
        },
        {
            deviceName: 'AIOT_FAN',
            key: '4',
            deviceId: '1234',
            type: 'lock',
            name: 'Lock',
            favorite: true,
            status: true,
            screenName: 'FanScreen'
        }
    ]
    const renderItem = (item) => (
        <View className='w-[50%] flex justify-between items-center' key = {item.key}>
            <DeviceCard device={item} theme={item.favorite ? 'light' : 'dark'} onPress = {() => { navigation.push(item.screenName) }}/>
        </View>
    )
    return (
        <>
            {
                // devices.length != 0
                //     ? (<DeviceTab.Navigator
                //         // initialRouteName="A"
                //         screenOptions={{
                //             headerShown: false
                //         }}
                //         tabBar={(props) => <TabBar {...props} />}
                //     >
                //         <DeviceTab.Screen
                //             name="Fan"
                //             component={FanScreen}
                //         ></DeviceTab.Screen>
                //         {/* {devices.map((device) => {
                //     if (device.deviceName === 'AIOT_FAN') {
                //         return (<DeviceTab.Screen
                //             key={device.deviceId}
                //             name={device.deviceName + device.deviceId + device.key}
                //             component={FanScreen}
                //             initialParams={{ deviceId: device.deviceId }}
                //         ></DeviceTab.Screen>)
                //     } else if (device.deviceName === 'AIOT_LIGHT') {
                //         return (<DeviceTab.Screen
                //             key={device.deviceId}
                //             name={device.deviceName + device.deviceId + device.key}
                //             component={LampScreen}
                //             initialParams={{ deviceId: device.deviceId }}
                //         ></DeviceTab.Screen>)
                //     }
                // }
                //     )
                //     } */}
                //     </DeviceTab.Navigator>)
                //     : null
                <View className="flex flex-col w-full h-full items-center justify-between gap-y-1 pt-[40px]">
                    <View className="flex flex-row w-full justify-between items-center px-4 ">
                        <View>
                            <Text className='font-bold text-3xl'>Hi User</Text>
                            <Text className='font-light'>Welcome Back</Text>
                        </View>
                        <Button
                            width="$5"
                            height="$5"
                            backgroundColor={'transparent'}
                            borderRadius={'$4'}
                            icon={Settings}
                            scaleIcon={2}
                        />
                    </View>
                    <View className="flex flex-row items-center justify-between w-full gap-x-3 ">
                        <View className="flex-1">
                            <WeatherWidget />
                        </View>
                        <View className='flex-1'>
                            <EnergyWidget />
                        </View>
                    </View>
                    {/* <FlatList
                        data = {devices}
                        // horizontal
                        numColumns={2}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                    /> */}

                    <View className="flex flex-row flex-wrap justify-between gap-y-3 items-center mb-2">
                        {devices.map((item) => {
                            return renderItem(item)
                        })}
                    </View>
                    {/* <View className="flex flex-col justify-start items-center gap-2 px-3">
                        <View className="w-full flex flex-row justify-between items-center">
                            <DeviceCard type='fan'/>
                            <DeviceCard type='air'/>
                        </View>
                        <View className="w-full flex flex-row justify-between items-center">
                            <DeviceCard/>
                            <DeviceCard/>
                        </View> */}
                    {/* </View> */}
                    <View className="flex flex-row justify-between items-start px-5 mb-6 w-full ">
                        <Text>Monday, 20 April</Text>
                        <View className="flex flex-col justify-center items-end">
                            <Text>FAMILY MEMBERS</Text>
                            <View className="flex flex-row justify-end items-end relative w-[200px]">
                                <Avatar className='absolute right-[0px] top-0 border border-white' circular size="$1">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                                <Avatar className='absolute right-[10px] top-0 border border-white' circular size="$1">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                                <Avatar className='absolute right-[20px] top-0 border border-white' circular size="$1">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                                <Avatar className='absolute right-[30px] top-0 border border-white' circular size="$1">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </>
    )
}

export { DevicesScreen }
