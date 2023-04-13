import { Button, Main } from 'tamagui'
import { ChevronDown, ChevronLeft, Settings } from '@tamagui/lucide-icons'
import { MainLayout } from './mainLayout'
import { Modal, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
function DeviceLayout ({ children, deviceName, navigation }) {
    const customCompare = (oldList, newList) => oldList === newList
    // const devices = useSelector(
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
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <MainLayout>
            <View className="flex-1 flex flex-col h-full w-full items-center pb-4">
                <View className="flex flex-row justify-between items-center w-full h-[fit] m-3 px-3">
                    <Button
                        width="$5"
                        height="$5"
                        backgroundColor={"transparent"}
                        icon={ChevronLeft}
                        scaleIcon={2.3}
                        onPress={() => navigation.navigate("DeviceHome")}
                    />
                    <View className="flex flex-col justify-center items-center">
                        <Text>Room</Text>
                        <Text className="text-2xl font-medium">
                            {deviceName || "No name"}
                        </Text>
                    </View>
                    <Button
                        width="$5"
                        height="$5"
                        backgroundColor={"transparent"}
                        borderRadius={"$4"}
                        icon={Settings}
                        scaleIcon={2}
                    />
                </View>
                <View className="flex-1 w-full">
                    {children}
                </View>
                <View className="flex flex-row justify-center items-center w-full ">
                    <Button
                        width={"$18"}
                        height="$4"
                        backgroundColor={"#DEE2E7"}
                        borderColor="white"
                        borderRadius={"$7"}
                        iconAfter={ChevronDown}
                        scaleIcon={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        onPress={() => setModalVisible(!modalVisible)}
                        zIndex={12}
                    >
                        <View className='absolute w-full h-full flex justify-center items-center'>
                            <Text>
                            {deviceName}
                            </Text>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <Pressable
                                className="flex-1 relative"
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View className=" absolute bottom-[70px] self-center bg-white rounded-[25px]  items-center shadow-[#000] w-[80%] h-fit overflow-hidden">
                                    <View className="flex flex-col w-full h-full justify-center items-center ">
                                        {devices.map((device, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    className="border-b border-b-[#363636]/10 w-full h-[50px]"
                                                >
                                                    <Button
                                                        className="w-full h-full"
                                                        borderRadius="$0"
                                                        backgroundColor="transparent"
                                                        onPress={() => {
                                                            navigation.push(
                                                                device.deviceName + device.key
                                                            );
                                                        }}
                                                    >
                                                        <Text className="w-full h-fit font-bold text-[16px] text-[#363636]/90">
                                                            {device.name} {device.key}
                                                        </Text>
                                                    </Button>
                                                </View>
                                            );
                                        })}
                                    </View>
                                    <View className="flex flex-row justify-between items-center p-3 gap-[10px]">
                                    </View>
                                </View>
                            </Pressable>
                        </Modal>
                    </Button>
                </View>
            </View>
        </MainLayout>
    )
}
export { DeviceLayout };
