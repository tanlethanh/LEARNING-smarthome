import { Button, Main } from "tamagui";
import { ChevronDown, ChevronLeft, Settings } from "@tamagui/lucide-icons";
import { Modal, Pressable, Text, View } from "react-native";

import React, { useState } from "react";

function DeviceLayout({ children, deviceName, navigation }) {
    const devices = [
        { name: "Fan", screen: "FanScreen" },
        { name: "Lamp", screen: "FanScreen" },
        { name: "Lock", screen: "LampScreen" },
        { name: "Home", screen: "DeviceHome" },
    ];
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View className="flex-1 flex flex-col h-full w-full items-center pb-4">
            <View className="flex flex-row justify-between items-center w-full h-[fit] m-3 px-3">
                <Button
                    width="$5"
                    height="$5"
                    backgroundColor={"transparent"}
                    icon={ChevronLeft}
                    scaleIcon={2.3}
                    onPress={() => navigation.goBack()}
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
            <View className="flex-1 w-full">{children}</View>
            <View className="flex flex-row justify-center items-center w-full">
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
                    justifyContent="flex-end"
                    alignItems="center"
                    onPress={() => setModalVisible(!modalVisible)}
                    zIndex={12}
                >
                    {deviceName}
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
                                                            device.screen,
                                                        );
                                                    }}
                                                >
                                                    <Text className="w-full h-fit font-bold text-[16px] text-[#363636]/90">
                                                        {device.name}
                                                    </Text>
                                                </Button>
                                            </View>
                                        );
                                    })}
                                </View>
                                <View className="flex flex-row justify-between items-center p-3 gap-[10px]"></View>
                            </View>
                        </Pressable>
                    </Modal>
                </Button>
            </View>
        </View>
    );
}
export { DeviceLayout };
