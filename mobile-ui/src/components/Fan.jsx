import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "tamagui";
import {
    ChartBarIcon,
    ClockIcon,
    CogIcon,
    PowerIcon,
} from "react-native-heroicons/outline";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Lottie from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";

import { Chart } from "./Chart";

function Fan({ updateValue, device }) {
    const [date, setDate2] = useState(new Date());
    const [schedule, setSchedule] = useState(0);
    const [chart, setChart] = useState(0);
    const [auto, setAuto] = useState(0);
    const [timer, setTimer] = useState(false);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [value, setValue] = useState(device.value);
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

    const handleSetPower = (power) => {
        updateValue(power);
        power == 0 ? fanRef.current?.pause() : fanRef.current?.resume();
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };
    const handleToggleAuto = () => {
        setAuto(!auto);
    };
    const fanRef = useRef(new Animated.Value(0));

    return (
        <View className="flex flex-col w-full h-full p-3 gap-1 items-center">
            <View className="w-[250px] h-[220px] items-center">
                <Lottie
                    ref={fanRef}
                    source={require("./../assets/fan.json")}
                    loop={true}
                    autoPlay={true}
                    speed={device.value}
                />
            </View>
            <View className="flex flex-row justify-center h-[100px] items-start w-full px-3">
                <View className="flex flex-col items-center justify-center h-full w-[100px]">
                    <TouchableOpacity
                        className="rounded-xl items-center"
                        onPress={() => {
                            if (device.value == 0) {
                                handleSetPower(2);
                            } else {
                                handleSetPower(0);
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
                <View className="flex flex-col items-center justify-center h-full w-[100px]">
                    <TouchableOpacity
                        className="rounded-xl items-center"
                        onPress={() => {
                            setChart(!chart);
                        }}
                    >
                        <Image
                            className="w-[80px] h-[80px] left-[2.5px]"
                            source={
                                chart != 0
                                    ? require("../assets/button-air-on.png")
                                    : require("../assets/button-air-off.png")
                            }
                        ></Image>
                        <ChartBarIcon
                            color={chart == 0 ? "black" : "white"}
                            size={28}
                            position={"absolute"}
                            top={chart == 0 ? 22 : 23}
                        />
                    </TouchableOpacity>

                    <Text className="text-small text-center font-medium text-black absolute bottom-2">
                        Chart
                    </Text>
                </View>
            </View>
            <View className="flex flex-row justify-center h-[95px] items-start w-full overflow-hidden px-3">
                <View className="bg-[#d9d9d9] shadow-md shadow-black w-[105px] h-[80px] items-center justify-center rounded-[20px]">
                    <Text className="font-semibold text-gray-700">
                        Humidity
                    </Text>
                    <Text className="font-bold text-gray-700">50%</Text>
                </View>
            </View>
            {device.value !== 0 && (
                <View className="flex flex-row justify-between items-center w-[300px] h-[60px] rounded-[10px] overflow-hidden ">
                    <Text>Slow</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={1}
                        maximumValue={3}
                        value={device.value}
                        onSlidingComplete={(newValue) => {
                            updateValue(newValue);
                        }}
                        disabled={device.value == 0}
                        step={1}
                        thumbTintColor="#41455d"
                        minimumTrackTintColor="#41455d"
                    ></Slider>
                    <Text>Fast</Text>
                </View>
            )}
            {schedule == 1 && (
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
            )}
            {chart == 1 && (
                <View>
                    <Chart
                        devicekey={"smarthome.lr-humi"}
                        title={"Humidity"}
                    ></Chart>
                </View>
            )}
        </View>
    );
}
export { Fan };
