import { Button, Main, Sheet, SheetFrame } from "tamagui";
import { ChevronDown, ChevronLeft, Settings } from "@tamagui/lucide-icons";
import { Modal, Pressable, Text, View } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { deviceTypes, roomTypes, selectDevices } from "../states";
import { useSelector } from "react-redux";
import React, { useState } from "react";

function DeviceLayout({ children, roomName, deviceName, navigation }) {
    const devicesMap = useSelector(selectDevices);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(0);
    const [show, setShow] = useState(roomName);
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
                    <Text>{roomName || "Room"}</Text>
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
            <View className="flex-1 w-full h-full">{children}</View>
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
                    onPress={() => setOpen(!open)}
                    zIndex={12}
                >
                    {deviceName}
                    <Sheet
                        forceRemoveScrollEnabled={open}
                        modal={true}
                        open={open}
                        onOpenChange={setOpen}
                        snapPoints={[60, 40, 20]}
                        dismissOnSnapToBottom
                        position={position}
                        onPositionChange={setPosition}
                        zIndex={100_000}
                        animation="bouncy" // for the css driver
                    >
                        <Sheet.Overlay />
                        <Sheet.Handle />
                        <Sheet.Frame
                            f={1}
                            p="$4"
                            jc="center"
                            ai="center"
                            space="$5"
                            backgroundColor={"white"}
                        >
                            <View className="flex flex-col rounded-xl border border-slate-200 h-full w-full overflow-hidden">
                                {Object.values(roomTypes).map((room, index) => {
                                    return (
                                        <View key={index}>
                                            <View className="bg-zinc-100 border-b border-b-[#363636]/10 w-full h-[50px]">
                                                <Button
                                                    className=" flex-row flex justify-between w-full h-full"
                                                    borderRadius="$0"
                                                    backgroundColor="transparent"
                                                    onPress={() => {
                                                        setShow(
                                                            show === room.name
                                                                ? ""
                                                                : room.name,
                                                        );
                                                    }}
                                                >
                                                    <Text className="w-[200px] h-fit font-bold text-[16px] text-[#363636]/90">
                                                        {room.name}
                                                    </Text>
                                                    <ChevronLeft></ChevronLeft>
                                                </Button>
                                            </View>
                                            {show === room.name ? (
                                                Object.values(devicesMap)
                                                    .filter(
                                                        (device) =>
                                                            device.room ===
                                                            room.key,
                                                    )
                                                    .map((device, index) => {
                                                        return (
                                                            <View
                                                                key={index}
                                                                className="border-b border-b-[#363636]/10 w-full h-[50px]"
                                                            >
                                                                <Button
                                                                    className=" flex-row flex justify-between w-full h-full"
                                                                    borderRadius="$0"
                                                                    backgroundColor="transparent"
                                                                    onPress={() => {
                                                                        navigation.push(
                                                                            "Device",
                                                                            {
                                                                                screen: device.type,
                                                                                params: {
                                                                                    deviceKey:
                                                                                        device.key,
                                                                                },
                                                                            },
                                                                        );
                                                                        setOpen(
                                                                            false,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Text className="px-5 w-[200px] h-fit font-bold text-[16px] text-[#363636]/90">
                                                                        {
                                                                            deviceTypes.find(
                                                                                (
                                                                                    ele,
                                                                                ) =>
                                                                                    ele.key ===
                                                                                    device.type,
                                                                            )
                                                                                .name
                                                                        }
                                                                    </Text>
                                                                    {deviceTypes.find(
                                                                        (ele) =>
                                                                            ele.key ===
                                                                            device.type,
                                                                    ).name ===
                                                                    deviceName ? (
                                                                        <StarIcon
                                                                            color={
                                                                                "#999999"
                                                                            }
                                                                        ></StarIcon>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </Button>
                                                            </View>
                                                        );
                                                    })
                                            ) : (
                                                <></>
                                            )}
                                        </View>
                                    );
                                })}
                                <View className="self-center w-full items-center h-[50px] overflow-hidden"></View>
                            </View>
                        </Sheet.Frame>
                    </Sheet>
                </Button>
            </View>
            <View className="h-[100px]"></View>
        </View>
    );
}
export { DeviceLayout };
