import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewBase,
} from "react-native";
import { Button, Sheet, SheetFrame } from "tamagui";
import { ClockIcon } from "react-native-heroicons/outline";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { DeviceSheet } from "./elements/BottomSheet";
import { RNSVGSvg } from "react-native-svg";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "toggle-switch-react-native";

export default function Lock({ updateValue, device }) {
    const password = ["1", "0", "0", "6", "0", "2"];
    const [schedule, setSchedule] = useState(0);
    const [date, setDate2] = useState(new Date());
    const [passcode, setPass] = useState(["", "", "", "", "", ""]);

    const [position, setPosition] = useState(0);
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [innerOpen, setInnerOpen] = useState(false);
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

    const number = [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
        { id: "7" },
        { id: "8" },
        { id: "9" },
        { id: "Cancel" },
        { id: "0" },
        { id: "OK" },
    ];

    const onPressNumber = (num) => {
        if (num == "OK") {
            CheckPass();
            return;
        }
        let i = 0;
        const tempCode = passcode.map((x) => x);
        for (i = 0; i < tempCode.length; i++) {
            if (tempCode[i] == "") {
                tempCode[i] = num;
                break;
            }
        }
        setPass(tempCode);
    };

    const CheckPass = () => {
        if (passcode.every((digit, index) => digit == password[index]))
            updateValue(device.value ? 0 : 1);
        setPass(["", "", "", "", "", ""]);
        setOpen(false);
    };
    return (
        <View className="flex flex-col w-full h-full p-3 gap-1 items-center">
            <View className="w-[250px] h-[330px] items-center">
                <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                        setOpen(true);
                    }}
                >
                    <Image
                        className="w-[300px] h-[315px] rounded-full top-10"
                        source={require("../assets/lock-button.png")}
                        resizeMode="stretch"
                    ></Image>
                    <Image
                        className="h-[150px] w-[150px] absolute top-24 "
                        source={
                            device.value == 1
                                ? require("../assets/lock.png")
                                : require("../assets/unlock.png")
                        }
                        resizeMode="stretch"
                    ></Image>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-center h-[100px] items-start w-full overflow-hidden px-3">
                <View className="flex items-center justify-center h-full w-[100px]">
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
                <Sheet.Frame f={1} p="$4" jc="center" ai="center" space="$5">
                    <View className="flex flex-col border border-slate-200  h-full w-full items-center gap-[20px]">
                        <View className="flex flex-row mt-[20px] shadow-md border-[#b2b5d2] border-2 shadow-black items-center justify-around rounded-[30px] bg-slate-300 w-[70%] h-[50px]">
                            {Object.values(passcode).map((letter, index) => {
                                return letter !== "" ? (
                                    <View
                                        key={index}
                                        className="h-[15px] w-[15px] bg-black rounded-[7.5px]"
                                    ></View>
                                ) : (
                                    <View
                                        key={index}
                                        className="h-[15px] w-[15px] bg-transparent rounded-[7.5px]"
                                    ></View>
                                );
                            })}
                        </View>
                        <View className="flex flex-row flex-wrap items-center justify-around rounded-[30px] w-[90%] h-[45%] gap-2">
                            {Object.values(number).map((num, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        className="h-[80px] w-[80px] bg-[#949cc4] items-center justify-center rounded-[30px] overflow-hidden"
                                        onPress={() => {
                                            onPressNumber(num.id);
                                        }}
                                    >
                                        <Text className="text-base font-bold">
                                            {num.id}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </Sheet.Frame>
            </Sheet>
        </View>
    );
}
