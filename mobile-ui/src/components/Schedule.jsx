import { Button } from "tamagui";
import { Check, ChevronsUp, Edit3, Plus, Trash2 } from "@tamagui/lucide-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, Text, View } from "react-native";
import React, { useRef, useState } from "react";
const SchduleCard = (props) => {
    const {
        onDelete = (id) => {
            alert("onDelete id");
        },
        info = {
            scheduleId: 1,
            from: new Date(),
            to: new Date(),
        },
    } = props;
    const [edit, setEdit] = useState(false);
    const [fromDate, setFromDate] = useState(info.from);
    const [toDate, setToDate] = useState(info.to);
    const handleOnEditFrom = () => {
        showDateTimePicker(fromDate, "time", (e, value) => {
            console.log("onchange");
            setFromDate(value);
        });
    };
    const showDateTimePicker = (value, mode = "time", callback) => {
        DateTimePickerAndroid.open({
            value,
            onChange: callback,
            mode,
            is24Hour: true,
        });
    };
    const handleOnEditTo = () => {
        showDateTimePicker(toDate, "time", (e, value) => {
            setToDate(value);
        });
    };
    const handleOnSubmit = () => {
        // for test purpose only
        const from =
            fromDate.getHours() > 12
                ? fromDate.getHours() - 12 + ":" + fromDate.getMinutes() + " AM"
                : fromDate.getHours() + ":" + fromDate.getMinutes() + " PM";
        const to =
            toDate.getHours() > 12
                ? toDate.getHours() - 12 + ":" + toDate.getMinutes() + " AM"
                : toDate.getHours() + ":" + toDate.getMinutes() + " PM";
        const ofrom =
            info.from.getHours() > 12
                ? info.from.getHours() -
                  12 +
                  ":" +
                  info.from.getMinutes() +
                  " AM"
                : info.from.getHours() + ":" + info.from.getMinutes() + " PM";
        const oto =
            info.to.getHours() > 12
                ? info.to.getHours() - 12 + ":" + info.to.getMinutes() + " AM"
                : info.to.getHours() + ":" + info.to.getMinutes() + " PM";
        if (
            fromDate.getTime() != info.from.getTime() ||
            toDate.getTime() != info.to.getTime()
        ) {
            console.log(`submit: ${from} ${to} change from ${ofrom} ${oto}`);
        }
    };
    const handleOnDeleteSchedule = () => {
        onDelete(info.scheduleId);
    };
    return (
        <View className=" flex flex-row justify-between w-full h-[65px] py-1 px-2 bg-[#e8e8e8]  rounded-[20px] my-1">
            <View className="flex-1 flex flex-row justify-start item-center w-full h-full pl-1">
                <View className="flex-1 flex flex-row justify-start gap-x-[5px] items-center h-full">
                    <Text className="font-normal text-[17px] text-[#656159] mr-1">
                        From
                    </Text>
                    <Pressable onPress={edit ? handleOnEditFrom : () => {}}>
                        <Text
                            className="font-semibold text-[20px] text-[#312f2c]  rounded-[15px] px-[8px] py-2 "
                            style={{
                                backgroundColor: edit
                                    ? "#e1dad2"
                                    : "transparent",
                            }}
                        >
                            {fromDate.getHours() > 12
                                ? fromDate.getHours() -
                                  12 +
                                  ":" +
                                  fromDate.getMinutes() +
                                  " AM"
                                : fromDate.getHours() +
                                  ":" +
                                  fromDate.getMinutes() +
                                  " PM"}
                        </Text>
                    </Pressable>
                </View>
                <View className="flex-1 flex flex-row justify-end gap-x-[5px] items-center h-full ">
                    <Text className="font-normal text-[17px] text-[#656159]">
                        To
                    </Text>
                    <Pressable onPress={edit ? handleOnEditTo : () => {}}>
                        <Text
                            className="font-semibold text-[20px] text-[#312f2c]  rounded-[15px] px-[8px] py-2  "
                            style={{
                                backgroundColor: edit
                                    ? "#e1dad2"
                                    : "transparent",
                            }}
                        >
                            {toDate.getHours() > 12
                                ? toDate.getHours() -
                                  12 +
                                  ":" +
                                  toDate.getMinutes() +
                                  " AM"
                                : toDate.getHours() +
                                  ":" +
                                  toDate.getMinutes() +
                                  " PM"}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className="w-[65px] h-full flex flex-row justify-end items-center gap-x-[5px] ml-1 ">
                {edit ? (
                    <>
                        <Button
                            // scaleIcon={2}
                            size="$1"
                            borderRadius={"$8"}
                            backgroundColor={"transparent"}
                            onPress={handleOnDeleteSchedule}
                        >
                            <Trash2 color="#656159" />
                        </Button>
                        <Button
                            size="$1"
                            borderRadius={"$8"}
                            backgroundColor={"transparent"}
                            onPress={() => {
                                setEdit((value) => !value);
                                handleOnSubmit();
                            }}
                        >
                            <Check color="#656159" />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            size="$2"
                            borderRadius={"$8"}
                            backgroundColor={"transparent"}
                            onPress={() => {
                                setEdit((value) => !value);
                            }}
                        >
                            <Edit3 color="#656159" />
                        </Button>
                    </>
                )}
            </View>
        </View>
    );
};
const Schedule = (props) => {
    const { schedules = [[], [], []] } = props;
    const handleOnAdd = () => {
        alert("add");
    };
    return (
        <View className="flex flex-col justify-center items-center w-[100%]">
            <View className="w-full justify-between flex flex-row">
                <Text className="font-semibold text-[22px] px-[4]">
                    Schedule
                </Text>
                <Button
                    size="$2"
                    borderRadius={"$8"}
                    backgroundColor={"transparent"}
                    onPress={handleOnAdd}
                >
                    <Plus color="#656159" />
                </Button>
            </View>
            {schedules.map((schedule, index) => (
                <SchduleCard
                    key={"sche-" + index}
                    info={{
                        scheduleId: 1,
                        from: new Date(),
                        to: new Date(),
                    }}
                    onDelete={(value) => {
                        alert(value);
                    }}
                    onEdit={() => alert("edit card" + index)}
                />
            ))}
        </View>
    );
};
export { Schedule };
