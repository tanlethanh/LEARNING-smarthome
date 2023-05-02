import {
    Alert,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewBase,
} from "react-native";
import { Button, Sheet, SheetFrame } from "tamagui";
import {
    ChartBarIcon,
    ClockIcon,
    CogIcon,
    PowerIcon,
} from "react-native-heroicons/outline";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { DeviceSheet } from "./elements/BottomSheet";
import { LineChart } from "react-native-chart-kit";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "toggle-switch-react-native";

function Lamp({ updateValue, device }) {
    const [date, setDate2] = useState(new Date());
    const [schedule, setSchedule] = useState(0);
    const [auto, setAuto] = useState(0);
    const [chart, setChart] = useState(0);
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

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };
    const handleToggleAuto = () => {
        setAuto(!auto);
    };

    return (
        <View className="flex flex-col w-full h-full p-3 gap-1 items-center">
            <View className="w-[250px] h-[220px] items-center">
                <Image
                    className="h-[220px] w-[220px]"
                    source={
                        device.value != 0
                            ? require("../assets/lightOn.png")
                            : require("../assets/lightOff.png")
                    }
                    resizeMode="stretch"
                ></Image>
            </View>
            <View className="flex flex-row justify-center h-[100px] items-start w-full overflow-hidden px-3">
                <View className="flex flex-col items-center justify-center h-full w-[100px]">
                    <TouchableOpacity
                        className="rounded-xl items-center"
                        onPress={() => {
                            if (device.value == 0) {
                                updateValue(device.defaultValue || 2);
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
            {device.value != 0 ? (
                <View className="flex flex-col border-[#8088b7] shadow-lg shadow-black border-2 items-center w-[300px] h-[120px] rounded-[10px] overflow-hidden ">
                    <View className="flex flex-row items-center w-[100%] h-[50%]">
                        <View className="w-[50%] h-fit">
                            <Button
                                className={
                                    device.value === 1
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(1);
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        device.value === 1
                                            ? "text-white"
                                            : "text-black"
                                    }
                                >
                                    25%
                                </Text>
                            </Button>
                        </View>
                        <View className="w-[50%] h-full">
                            <Button
                                className={
                                    device.value === 2
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(2);
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        device.value === 2
                                            ? "text-white"
                                            : "text-black"
                                    }
                                >
                                    50%
                                </Text>
                            </Button>
                        </View>
                    </View>
                    <View className="flex flex-row border-[#8088b7] border-1 items-center w-[100%] h-[50%]">
                        <View className="w-[50%] h-fit">
                            <Button
                                className={
                                    device.value === 3
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(3);
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        device.value === 3
                                            ? "text-white"
                                            : "text-black"
                                    }
                                >
                                    75%
                                </Text>
                            </Button>
                        </View>
                        <View className="w-[50%] h-fit">
                            <Button
                                className={
                                    device.value === 4
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(4);
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        device.value === 4
                                            ? "text-white"
                                            : "text-black"
                                    }
                                >
                                    100%
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            ) : (
                <></>
            )}
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
export { Lamp };
