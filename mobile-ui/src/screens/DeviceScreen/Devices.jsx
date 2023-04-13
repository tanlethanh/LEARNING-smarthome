import { Avatar, Button } from 'tamagui'
import { DeviceCard } from '../../components/DeviceCard'
import { EnergyWidget } from '../../components/EnergyWidget'
import { FlatList, ScrollView, Text, View, useWindowDimensions } from 'react-native'
import { MainLayout } from '../../layouts/mainLayout'
import { Settings } from '@tamagui/lucide-icons'
import { WeatherWidget } from '../../components/WeatherWidget'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
function DevicesScreen ({ navigation }) {
    const size = useWindowDimensions()
    const [currentRoom, setCurrentRoom] = useState(1)
    // console.log(size)
    const rooms = [
        {
            key: 1,
            name: 'Living Room'
        },
        {
            key: 2,
            name: 'Bedroom'
        },
        {
            key: 3,
            name: 'Study Room'
        }
    ]
    const customCompare = (oldList, newList) => oldList === newList
    // const devices = uaseSelector(
    //     (state) => state.devices.devicesList,
    //     customCompare
    // )
    const devices = [{
        deviceName: 'AIOT_FAN',
        key: '1',
        deviceId: '1234',
        type: 'lamp',
        favorite: true,
        name: 'Lamp',
        status: false,
        screenName: 'AIOT_FAN',
        roomId: 1

    },
    {
        deviceName: 'AIOT_FAN',
        key: '2',
        deviceId: '12355',
        type: 'fan',
        name: 'Fan',
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 1

    },
    {
        deviceName: 'AIOT_FAN',
        key: '3',
        deviceId: '1234',
        type: 'air',
        name: 'Air condition',
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 1

    },
    {
        deviceName: 'AIOT_FAN',
        key: '4',
        deviceId: '1234',
        type: 'lock',
        name: 'Lock',
        favorite: true,
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 1

    },
    {
        deviceName: 'AIOT_FAN',
        key: '5',
        deviceId: '1234',
        type: 'lamp',
        favorite: true,
        name: 'Lamp',
        status: false,
        screenName: 'AIOT_FAN',
        roomId: 2

    },
    {
        deviceName: 'AIOT_FAN',
        key: '6',
        deviceId: '125412',
        type: 'fan',
        name: 'Fan',
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 2

    },
    {
        deviceName: 'AIOT_FAN',
        key: '7',
        deviceId: '1234',
        type: 'air',
        name: 'Air condition',
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 2

    },
    {
        deviceName: 'AIOT_FAN',
        key: '8',
        deviceId: '1234',
        type: 'lock',
        name: 'Lock',
        favorite: true,
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 2
    },
    {
        deviceName: 'AIOT_FAN',
        key: '9',
        deviceId: '1234',
        type: 'lamp',
        favorite: true,
        name: 'Lamp',
        status: false,
        screenName: 'AIOT_FAN',
        roomId: 2

    },
    {
        deviceName: 'AIOT_FAN',
        key: '10',
        deviceId: '122524',
        type: 'fan',
        name: 'Fan',
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 3

    },
    {
        deviceName: 'AIOT_FAN',
        key: '11',
        deviceId: '1234',
        type: 'air',
        name: 'Air condition',
        status: true,
        screenName: 'AIOT_FAN',
        roomId: 3
    }
    ]
    const renderRoom = ({ item, index }) => (
        <Button
            key={'Room' + index}
            className='w-auto h-fit rounded-[20px] bg-transparent flex flex-col justify-start items-center gap-[5px] '
            onPress={() => { setCurrentRoom(item.key) }}
        >
            <Text className={item.key === currentRoom ? 'font-[600] text-[17px] text-black h-[21px]' : 'h-[21px] font-[600] text-[15px] text-[#838A8F]'}>
                {item.name}
            </Text>
            {item.key === currentRoom && <View className='w-[10px] h-[10px] rounded-[100px] bg-[#FF8A00]'></View>}
        </Button>
    )
    const renderItem = ({ item, index }) => (
        <View className='flex-1 flex justify-between items-center m-[8px]' key = {'devicecard' + index}>
            <DeviceCard
                device={item} theme={item.favorite ? 'light' : 'dark'}
                onPress = {() => { navigation.push(item.deviceName + item.key) }}
            />
        </View>
    )
    return (
        <MainLayout>
            {
                <View className="flex-1 flex flex-col w-full h-full items-center justify-between gap-y-1">
                    <View className="flex flex-row w-full justify-between items-center px-4 h-[80px]">
                        <View className='px-[40px]'>
                            <Text className='font-bold text-3xl h-[30px]'>Hi User</Text>
                            <Text className='font-light h-[21px] '>Welcome Back</Text>
                        </View>
                        <View className='absolute left-[40px] '>
                            <Text className='font-[700] text-[65px] text-black/[0.05] h-[98px] uppercase'>Home</Text>
                        </View>
                        <Button
                            width="$3"
                            height="$3"
                            borderRadius={'$4'}
                            icon={Settings}
                            scaleIcon={2}
                            style ={{
                                backgroundColor: '#DBE0E7',
                                borderRadius: 8,
                                elevation: 20,
                                shadowColor: 'black'
                            }}
                        />
                    </View>
                    <View className=" flex flex-row items-center justify-between w-full gap-x-3 mb-[10px]">
                        <View className="flex-1">
                            <WeatherWidget />
                        </View>
                        <View className='flex-1'>
                            <EnergyWidget />
                        </View>
                    </View>
                    <View className="first:h-fit w-full flex flex-row justify-between items-center ">
                        <FlatList
                            className='h-fit w-full px-[15px]'
                            data={rooms}
                            horizontal
                            renderItem={renderRoom}
                            contentContainerStyle={{
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        />
                    </View>
                    <View className="flex-1 w-full flex flex-col justify-center items-center px-[10px]">
                        <FlatList
                            data={devices.filter((device) => { return device.roomId == currentRoom })}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            renderItem={renderItem}
                            className='w-full h-full'
                        >
                        </FlatList>
                    </View>
                    <View className="flex flex-row justify-between items-start px-5 mb-6 w-full ">
                        <Text>Monday, 20 April</Text>
                        <View className="flex flex-col justify-center items-end">
                            <Text>FAMILY MEMBERS</Text>
                            <View className="flex flex-row justify-end items-end relative w-[200px]">
                                <Avatar className='absolute right-[0px] top-0 border border-white' circular size="$2">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                                <Avatar className='absolute right-[15px] top-0 border border-white' circular size="$2">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                                <Avatar className='absolute right-[30px] top-0 border border-white' circular size="$2">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                                <Avatar className='absolute right-[45px] top-0 border border-white' circular size="$2">
                                    <Avatar.Image src="http://placekitten.com/200/300" />
                                    <Avatar.Fallback bc="red" />
                                </Avatar>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </MainLayout>
    )
}

export { DevicesScreen }
