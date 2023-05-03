import {
    Alert,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewBase,
} from "react-native";
import { Button, Sheet } from "tamagui";
import {
    ChartBarIcon,
    ClockIcon,
    CogIcon,
    PowerIcon,
} from "react-native-heroicons/outline";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { addPadding, getPadding, removePadding } from "../utils/numberUtils";
import React, { useEffect, useState } from "react";

function Lamp({ updateValue, device }) {
    const [date, setDate2] = useState(new Date());
    const [schedule, setSchedule] = useState(0);
    const [auto, setAuto] = useState(0);
    const [chart, setChart] = useState(false);
    const [timer, setTimer] = useState(false);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [value, setValue] = useState(device.value);
    const [position, setPosition] = useState(0);

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
                        removePadding(device.value) != 0
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
                            if (removePadding(device.value) == 0) {
                                updateValue(
                                    addPadding(2, getPadding(device.value)),
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

                {device.tag == "AUTO" && (
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
            {removePadding(device.value) != 0 ? (
                <View className="flex flex-col border-[#8088b7] shadow-lg shadow-black border-2 items-center w-[300px] h-[120px] rounded-[10px] overflow-hidden ">
                    <View className="flex flex-row items-center w-[100%] h-[50%]">
                        <View className="w-[50%] h-fit">
                            <Button
                                className={
                                    removePadding(device.value) === 1
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(
                                        addPadding(1, getPadding(device.value)),
                                    );
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        removePadding(device.value) === 1
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
                                    removePadding(device.value) === 2
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(
                                        addPadding(2, getPadding(device.value)),
                                    );
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        removePadding(device.value) === 2
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
                                    removePadding(device.value) === 3
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(
                                        addPadding(3, getPadding(device.value)),
                                    );
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        removePadding(device.value) === 3
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
                                    removePadding(device.value) === 4
                                        ? "bg-[#41455d]"
                                        : "bg-[#DEE2E7]"
                                }
                                flex={1}
                                borderRadius={0}
                                onPress={() => {
                                    updateValue(
                                        addPadding(4, getPadding(device.value)),
                                    );
                                }}
                                height="100%"
                                width="100%"
                            >
                                <Text
                                    className={
                                        removePadding(device.value) === 4
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
                >
                    <View className="flex flex-col rounded-xl border border-slate-200 h-full w-full overflow-hidden">
                        <View className="self-center w-full items-center h-[50px] overflow-hidden"></View>
                    </View>
                </Sheet.Frame>
            </Sheet>
        </View>
    );
}
export { Lamp };
