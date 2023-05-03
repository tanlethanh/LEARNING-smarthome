import { Button, Sheet } from "tamagui";
import { Chart } from "./Chart";
import {
    ChartBarIcon,
    ClockIcon,
    CogIcon,
    PowerIcon,
} from "react-native-heroicons/outline";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { RadialSlider } from "react-native-radial-slider";
import { addPadding, getPadding, removePadding } from "../utils/numberUtils";
import { roomTypes, selectDevices } from "../states";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";

function AirConditioner({ updateValue, device }) {
    const [schedule, setSchedule] = useState(false);
    const [chart, setChart] = useState(0);
    const [timer, setTimer] = useState(false);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [value, setValue] = useState(device.value);
    const devicesMap = useSelector(selectDevices);
    const [position, setPosition] = useState(0);
    useEffect(() => {
        updateValue(value);
    }, [value]);

    const handleSetTimer = (newValue) => {
        const sValue = newValue % 60;
        const mValue = Math.floor(newValue / 60) % 60;
        const hValue = Math.floor(newValue / 3600);
        const [chart, setChart] = useState(0);
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
                        updateValue(
                            Math.floor(device.value / 1000) * 1000 + newValue,
                        );
                    }}
                    unit={"\u00b0C"}
                    subTitle={device.value % 1000 == 0 ? "Turn Off" : "Cooling"}
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
                            if (removePadding(device.value) == 0) {
                                updateValue(
                                    addPadding(25, getPadding(device.value)),
                                );
                            } else {
                                updateValue(
                                    addPadding(0, getPadding(device.value)),
                                );
                            }
                        }}
                    >
                        <Image
                            className="w-[80px] h-[80px] left-[2.5px]"
                            source={
                                removePadding(device.value) != 0
                                    ? require("../assets/button-air-on.png")
                                    : require("../assets/button-air-off.png")
                            }
                        ></Image>
                        <PowerIcon
                            color={
                                removePadding(device.value) == 0
                                    ? "black"
                                    : "white"
                            }
                            size={28}
                            position={"absolute"}
                            top={removePadding(device.value) == 0 ? 22 : 23}
                        />
                    </TouchableOpacity>

                    <Text className="text-small text-center font-medium text-black absolute bottom-2">
                        Power
                    </Text>
                </View>

                {device.tag === "AUTO" && (
                    <View className="flex flex-col items-center justify-center h-full w-[100px]">
                        <TouchableOpacity
                            className="rounded-xl items-center"
                            onPress={() => {
                                if (getPadding(device.value) == 1000) {
                                    updateValue(removePadding(device.value));
                                } else
                                    updateValue(addPadding(device.value, 1000));
                            }}
                        >
                            <Image
                                className="w-[80px] h-[80px] left-[2.5px]"
                                source={
                                    getPadding(device.value) == 1000
                                        ? require("../assets/button-air-on.png")
                                        : require("../assets/button-air-off.png")
                                }
                            ></Image>
                            <CogIcon
                                color={
                                    getPadding(device.value) == 0
                                        ? "black"
                                        : "white"
                                }
                                size={28}
                                position={"absolute"}
                                top={getPadding(device.value) == 0 ? 22 : 23}
                            />
                        </TouchableOpacity>

                        <Text className="text-small text-center font-medium text-black absolute bottom-2">
                            Auto
                        </Text>
                    </View>
                )}

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
            <View className="flex flex-row justify-between h-[95px] items-start w-full overflow-hidden px-3">
                <View className="bg-[#d9d9d9] shadow-md shadow-black w-[105px] h-[80px] items-center justify-center rounded-[20px]">
                    <Text className="font-semibold text-gray-700">
                        Temp Indoor
                    </Text>
                    <Text className="font-bold text-gray-700">
                        {/* {
                            devicesMap.find((ele) => {
                                console.log(ele.name);
                                return (
                                    ele.room == device.room &&
                                    ele.type == "TEMP"
                                );
                            }).value
                        } */}
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
                        devicekey={"smarthome.lr-temp"}
                        title={"Temperature"}
                    ></Chart>
                </View>
            )}
            <Sheet
                forceRemoveScrollEnabled={schedule}
                modal={true}
                open={schedule}
                onOpenChange={setSchedule}
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
                    borderRadius={40}
                >
                    <View className="flex flex-col rounded-xl border border-slate-200 h-full w-full overflow-hidden">
                        <View className="self-center w-full items-center h-[50px] overflow-hidden"></View>
                    </View>
                </Sheet.Frame>
            </Sheet>
        </View>
    );
}

export { AirConditioner };
