import { Button } from "tamagui";
import {
    CloudArrowDownIcon,
    HomeIcon,
    UserIcon,
} from "react-native-heroicons/solid";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RefreshCcw } from "@tamagui/lucide-icons";
import { loadFeeds } from "../states/init";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function BottomBar() {
    const navigation = useNavigation();

    return (
        <View className="absolute bottom-0 h-[100px] w-full flex flex-row justify-center">
            {/* <TouchableOpacity
                className="h-[50px] w-[50px] flex absolute items-center justify-center rounded-full bg-slate-200 bg-black"
                onPress={loadFeeds}
            ></TouchableOpacity> */}
            <Button
                className="h-[50px] w-[50px] flex absolute items-center justify-center rounded-full z-30"
                icon={<RefreshCcw size={28} fill={"white"} />}
                circular={true}
                onPress={() => {
                    console.log("Refresh");
                    loadFeeds();
                }}
            ></Button>

            <View className="flex flex-row justify-between w-screen absolute bottom-0 z-0">
                <Image
                    source={require("../assets/left-bt-bar.png")}
                    className="w-[150px]"
                />
                <Image
                    source={require("../assets/right-bt-bar.png")}
                    className="w-[150px]"
                />
            </View>
            <View className="absolute top-8 left-8">
                <Button
                    icon={<HomeIcon size={28} fill={"white"} />}
                    className="p-0 bg-transparent "
                    circular={true}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                ></Button>
            </View>
            <View className="absolute top-8 right-8">
                <Button
                    icon={<UserIcon size={28} fill={"white"} />}
                    className="p-0 bg-transparent "
                    circular={true}
                ></Button>
            </View>
        </View>
    );
}
