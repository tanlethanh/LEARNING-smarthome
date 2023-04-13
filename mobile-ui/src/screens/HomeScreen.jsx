import { Avatar, Button } from "tamagui";
import {
    DeviceCard,
    EnergyWidget,
    RoomButton,
    WeatherWidget,
} from "../components";

import { FlatList, Text, View } from "react-native";
import { MainLayout } from "../layouts";
import { Settings } from "@tamagui/lucide-icons";

import { rooms, selectDevices } from "../states";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

export function HomeScreen() {
    const naviation = useNavigation();

    const devicesMap = useSelector(selectDevices);

    const [currentRoom, setCurrentRoom] = useState(rooms[0]);

    const renderRoom = ({ item, index }) => {
        return (
            <RoomButton
                key={index}
                onPress={() => {
                    setCurrentRoom(item);
                }}
                name={item.name}
                isChosen={currentRoom.key == item.key}
            ></RoomButton>
        );
    };

    return (
        <MainLayout withScrollView>
            <View className="flex-1 flex flex-col w-full h-full items-center justify-between gap-y-1">
                <View className="flex flex-row w-full justify-between items-center px-4 h-[80px]">
                    <View className="">
                        <Text className="font-bold text-3xl h-[30px]">
                            Hi Sovi
                        </Text>
                        <Text className="font-light h-[21px] ">
                            Welcome Back
                        </Text>
                    </View>
                    <View className="absolute left-[40px] ">
                        <Text className="font-[700] text-[65px] text-black/[0.05] h-[98px] uppercase">
                            Home
                        </Text>
                    </View>
                    <Button
                        width="$3"
                        height="$3"
                        borderRadius={"$4"}
                        icon={Settings}
                        scaleIcon={2}
                        style={{
                            backgroundColor: "#DBE0E7",
                            borderRadius: 8,
                            elevation: 20,
                            shadowColor: "black",
                        }}
                    />
                </View>

                {/* Widgets */}
                <View className=" flex flex-row items-center justify-between w-full gap-x-3 mb-[10px]">
                    <View className="flex-1">
                        <WeatherWidget />
                    </View>
                    <View className="flex-1">
                        <EnergyWidget />
                    </View>
                </View>

                <View className="first:h-fit w-full flex flex-row justify-between items-center ">
                    <FlatList
                        className="h-fit w-full px-[15px]"
                        data={rooms}
                        horizontal
                        renderItem={renderRoom}
                        contentContainerStyle={{
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    />
                </View>

                <View className="w-full h-full flex-row flex-wrap justify-around">
                    {Object.values(devicesMap)
                        .filter((ele) => ele.room === currentRoom.key)
                        .map((ele, index) => {
                            return (
                                <View key={index} className="mt-4">
                                    <DeviceCard
                                        device={ele}
                                        theme={"light"}
                                        onPress={() => {
                                            naviation.navigate("Device", {
                                                screen: String(ele.id),
                                            });
                                        }}
                                    />
                                </View>
                            );
                        })}
                </View>

                {/* Footer */}
                <View className="flex flex-row justify-between items-start px-5 mb-6 w-full ">
                    <Text>Monday, 20 April</Text>
                    <View className="flex flex-col justify-center items-end">
                        <Text>FAMILY MEMBERS</Text>
                        <View className="flex flex-row justify-end items-end relative w-[200px]">
                            <Avatar
                                className="absolute right-[0px] top-0 border border-white"
                                circular
                                size="$2"
                            >
                                <Avatar.Image src="http://placekitten.com/200/300" />
                                <Avatar.Fallback bc="red" />
                            </Avatar>
                            <Avatar
                                className="absolute right-[15px] top-0 border border-white"
                                circular
                                size="$2"
                            >
                                <Avatar.Image src="http://placekitten.com/200/300" />
                                <Avatar.Fallback bc="red" />
                            </Avatar>
                            <Avatar
                                className="absolute right-[30px] top-0 border border-white"
                                circular
                                size="$2"
                            >
                                <Avatar.Image src="http://placekitten.com/200/300" />
                                <Avatar.Fallback bc="red" />
                            </Avatar>
                            <Avatar
                                className="absolute right-[45px] top-0 border border-white"
                                circular
                                size="$2"
                            >
                                <Avatar.Image src="http://placekitten.com/200/300" />
                                <Avatar.Fallback bc="red" />
                            </Avatar>
                        </View>
                    </View>
                </View>
            </View>
        </MainLayout>
    );
}
