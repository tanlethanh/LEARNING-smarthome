import { Text, View, ViewBase, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import Slider from "@react-native-community/slider";

function Lamp({ powerState, callback }) {
    const [power, setpower] = useState(powerState);
    const handleToggle = () => {
        console.log("toogle, powerstate: ", powerState);
        callback(powerState == 0 ? 50 : 0);
    }
    useEffect(() => {
    },
        [powerState])

    return (
        <View className="flex flex-col w-full h-full items-center bg-white py-5">
            <View className="flex flex-row justify-between items-center px-2.5 w-full">
                <Text className="font-semibold text-gray-700 text-xl">
                    {powerState == 1 ? "On" : "Off"}
                </Text>
                <ToggleSwitch isOn={powerState == 1} onToggle={handleToggle}></ToggleSwitch>
            </View>
            <View className="flex justify-center items-center w-72 h-72">
                <Image
                    className="w-52 h-52 mix-blend-multiply"
                    source={require("../assets/lamp.png")}
                ></Image>
            </View>
            <Text>Current level: {power}</Text>
            <View className="flex flex-row justify-center items-center w-full h-20 gap-3">
                <Image source={require("../assets/lamp_off.png")}></Image>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={powerState}
                    onValueChange={(newValue) => { callback(newValue) }}
                    disabled={powerState == 0}
                    step={5}
                ></Slider>
                <Image source={require("../assets/lamp_on.png")}></Image>
            </View>
        </View>
    );
}
export { Lamp };
