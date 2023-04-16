import { Button } from "tamagui";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { RadialSlider } from "react-native-radial-slider";

import React, { useRef, useState } from "react";
// import PowerIcon
import { ClockIcon, CogIcon, PowerIcon } from "react-native-heroicons/outline";

function AirConditioner({ updateValue, device }) {
    const [schedule, setSchedule] = useState(0);
    const [auto, setAuto] = useState(0);
    const [timer, setTimer] = useState(false);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    const handleToggleAuto = () => {
        setAuto(!auto);
    };

    const handleSetTimer = (newValue) => {
        const sValue = newValue % 60;
        const mValue = Math.floor(newValue / 60) % 60;
        const hValue = Math.floor(newValue / 3600);
        setSecond(() => parseInt(sValue));
        setMinute(() => parseInt(mValue));
        setHour(() => parseInt(hValue));
        setTimer(newValue != 0);
    };

    const [date, setDate2] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate2(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        console.log("Here");
        showMode("time");
    };

    return (
        <View className="flex flex-col w-full h-full p-3 gap-1 items-center">
            <View className="w-[250px] h-[220px] items-center">
                <RadialSlider
                    value={device.value}
                    min={15}
                    max={30}
                    onChange={(newValue) => {
                        updateValue(newValue);
                    }}
                    unit={"\u00b0C"}
                    subTitle={device.value == 0 ? "Turn Off" : "Cooling"}
                    sliderTrackColor="#cccccc"
                    lineColor="#cccccc"
                    thumbColor="#0088cc"
                    thumbBorderColor="#b3e0ff"
                    isHideValue={device.value === 0}
                    isHideSlider={device.value === 0}
                />
            </View>

            <View className="flex flex-row justify-center h-[100px] items-start w-full overflow-hidden px-3">
                <View className="flex flex-col items-center justify-center h-full w-[100px]">
                    <TouchableOpacity
                        className="rounded-xl items-center"
                        onPress={() => {
                            if (device.value == 0) {
                                updateValue(device.defaultValue || 25);
                            } else {
                                updateValue(0);
                            }
                        }}
                    >
                        <Image
                            className="w-[80px] h-[80px] left-[2.5px]"
                            source={
                                device.value != 0
                                    ? require("../assets/button-air-on.png")
                                    : require("../assets/button-air-off.png")
                            }
                        ></Image>
                        <PowerIcon
                            color={device.value == 0 ? "black" : "white"}
                            size={28}
                            position={"absolute"}
                            top={device.value == 0 ? 22 : 23}
                        />
                    </TouchableOpacity>

                    <Text className="text-small text-center font-medium text-black absolute bottom-2">
                        Power
                    </Text>
                </View>

                <View className="flex flex-col items-center justify-center h-full w-[100px]">
                    <TouchableOpacity
                        className="rounded-xl items-center"
                        onPress={handleToggleAuto}
                    >
                        <Image
                            className="w-[80px] h-[80px] left-[2.5px]"
                            source={
                                auto != 0
                                    ? require("../assets/button-air-on.png")
                                    : require("../assets/button-air-off.png")
                            }
                        ></Image>
                        <CogIcon
                            color={auto == 0 ? "black" : "white"}
                            size={28}
                            position={"absolute"}
                            top={auto == 0 ? 22 : 23}
                        />
                    </TouchableOpacity>

                    <Text className="text-small text-center font-medium text-black absolute bottom-2">
                        Auto
                    </Text>
                </View>

                <View className="flex flex-col items-center justify-center h-full w-[100px]">
                    <TouchableOpacity
                        className="rounded-xl items-center"
                        onPress={() => {
                            setSchedule(!schedule);
                        }}
                    >
                        <Image
                            className="w-[80px] h-[80px] left-[2.5px]"
                            source={
                                schedule != 0
                                    ? require("../assets/button-air-on.png")
                                    : require("../assets/button-air-off.png")
                            }
                        ></Image>
                        <ClockIcon
                            color={schedule == 0 ? "black" : "white"}
                            size={28}
                            position={"absolute"}
                            top={schedule == 0 ? 22 : 23}
                        />
                    </TouchableOpacity>

                    <Text className="text-small text-center font-medium text-black absolute bottom-2">
                        Schedule
                    </Text>
                </View>
            </View>
            <View className="flex flex-row justify-between h-[95px] items-start w-full overflow-hidden px-3">
                <View className="bg-[#d9d9d9] shadow-md shadow-black w-[105px] h-[80px] items-center justify-center rounded-[20px]">
                    <Text className="font-semibold text-gray-700">
                        Temp Indoor
                    </Text>
                    <Text className="font-bold text-gray-700">
                        {18 + "\u00b0C"}
                    </Text>
                </View>
                <View className="bg-[#d9d9d9] shadow-md shadow-black w-[110px] h-[80px] items-center justify-center rounded-[20px]">
                    <Text className="font-semibold text-gray-700">
                        Temp Out
                    </Text>
                    <Text className="font-bold text-gray-700">
                        {18 + "\u00b0C"}
                    </Text>
                </View>
                <View className="bg-[#d9d9d9] shadow-md shadow-black w-[110px] h-[80px] items-center justify-center rounded-[20px]">
                    <Text className="font-semibold text-gray-700">
                        Wind Speed
                    </Text>
                    <Text className="font-bold text-gray-700">
                        {2 + " Grade"}
                    </Text>
                </View>
            </View>
            {schedule == 1 ? (
                <View className="flex flex-col items-center justify-center gap-1">
                    <Button
                        onPress={() => {
                            showDatepicker();
                        }}
                        title="Show time picker!"
                        backgroundColor={"#cccccc"}
                    >
                        Date
                    </Button>
                    <Button
                        onPress={() => {
                            showTimepicker();
                        }}
                        title="Show time picker!"
                        backgroundColor={"#cccccc"}
                    >
                        Time
                    </Button>
                    <Text>Schedule: {date.toLocaleString()}</Text>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}

export { AirConditioner };
