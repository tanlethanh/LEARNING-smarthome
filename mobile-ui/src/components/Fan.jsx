import { Alert, Image, Text, View, ViewBase } from "react-native";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "toggle-switch-react-native";

function Fan({ updateValue, device }) {
    return (
        <View className="flex flex-col w-full h-full items-center bg-white py-2 px-3">
            <View className="flex flex-row justify-between items-center px-2.5 w-full">
                <Text className="font-semibold text-gray-700 text-xl">
                    {updateValue != 0 ? "On" : "Off"}
                </Text>
                <ToggleSwitch
                    isOn={device.value}
                    onToggle={() => {
                        updateValue(device.value ? 0 : 2);
                    }}
                ></ToggleSwitch>
            </View>
            <View className="flex justify-center items-center w-72 h-72">
                <Image
                    className="w-52 h-52 mix-blend-multiply"
                    source={require("../assets/fan.json")}
                ></Image>
            </View>
            <Text>Current level: {device.value}</Text>
            <View className="flex flex-row justify-center items-center w-full h-20 gap-3">
                <Text>Low</Text>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={3}
                    value={device.value}
                    onValueChange={(newValue) => {
                        updateValue(newValue);
                    }}
                    disabled={device.value == 0}
                    step={1}
                ></Slider>
                <Text>High</Text>
            </View>
        </View>
    );
}
export { Fan };
