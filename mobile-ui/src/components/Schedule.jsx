/* eslint-disable camelcase */
import { Button } from "tamagui";
import { Check, ChevronsUp, Edit3, Plus, Trash2 } from "@tamagui/lucide-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const ScheduleCard = (props) => {
    const {
        onDelete = (sche) => {
            alert("onDelete");
        },
        onUpdate = (sche) => {
            alert("update");
        },
        info = {
            __v: 0,
            _id: "644fcee76c48d23451704ab7",
            feed_id: "smarthome.lr-aircond",
            option: "ONCE",
            status: "DONE",
            trigger_time: "2023-05-01T14:38:33.043Z",
            expired_time: "  2023-05-09T10:10:00.000Z",
            user_id: "",
            value: "4",
        },
    } = props;
    const { trigger_time = "", expired_time = null, _id } = info;
    const from = new Date(trigger_time);
    const to = expired_time ? new Date(expired_time) : null;
    const [edit, setEdit] = useState(false);
    const [fromDate, setFromDate] = useState(from);
    const [toDate, setToDate] = useState(to);
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
        if (
            fromDate.getTime() != from.getTime() ||
            (to && toDate.getTime() != to.getTime())
        ) {
            onUpdate();
        }
    };
    const handleOnDeleteSchedule = () => {
        onDelete(info);
    };
    return (
        <View className=" flex flex-row justify-between w-full h-[100px] py-1 px-2 bg-[#e8e8e8] rounded-[20px] my-1">
            <View className="flex flex-col flex-1">
                <View className="flex-1 flex flex-row justify-start item-center w-full h-full pl-1">
                    {expired_time ? (
                        <>
                            <View className="flex-1 flex flex-row justify-start gap-x-[5px] items-center h-full">
                                <Text className="font-normal text-[17px] text-[#656159] mr-1">
                                    From
                                </Text>
                                <Pressable
                                    onPress={edit ? handleOnEditFrom : () => {}}
                                >
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
                            <View className="flex-1 flex flex-row justify-start gap-x-[5px] items-center h-full ml-[15px]">
                                <Text className="font-normal text-[17px] text-[#656159]">
                                    To
                                </Text>
                                <Pressable
                                    onPress={edit ? handleOnEditTo : () => {}}
                                >
                                    {toDate && (
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
                                    )}
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <View className="flex-1 flex flex-row justify-start gap-x-[5px] items-center h-full">
                            <Text className="font-normal text-[17px] text-[#656159]">
                                At
                            </Text>
                            <Pressable
                                onPress={edit ? handleOnEditTo : () => {}}
                            >
                                {fromDate && (
                                    <Text
                                        className="font-semibold text-[20px] text-[#312f2c]  rounded-[15px] px-[8px] py-2  "
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
                                )}
                            </Pressable>
                        </View>
                    )}
                </View>
                <View className="flex-1 flex flex-row justify-start item-center w-full h-full pl-1">
                    <View className="flex-1 flex flex-row justify-start gap-x-[5px] items-center h-full">
                        <Text className="font-normal text-[17px] text-[#656159]">
                            Level
                        </Text>
                        <Text
                            className="font-semibold text-[20px] text-[#656159]  rounded-[15px] px-[8px] py-2  "
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            {info.value}
                        </Text>
                    </View>
                    <View className="flex-1 flex flex-row justify-start gap-x-[5px] ml-[15px] items-center h-full">
                        <Text className="font-normal text-[17px] text-[#656159]">
                            Type
                        </Text>
                        <Text
                            className="font-semibold text-[20px] text-[#656159]  rounded-[15px] px-[8px] py-2  "
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            {info.option}
                        </Text>
                    </View>
                </View>
            </View>

            <View className="w-[65px] h-full flex flex-row justify-end items-center gap-x-[5px] ml-1 ">
                {info.status === "DONE" || info.status === "CANCEL" ? (
                    <Text>{info.status}</Text>
                ) : edit ? (
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
                            disabled={
                                info.status === "DONE" ||
                                info.status === "CANCEL"
                            }
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
                            disabled={
                                info.status === "DONE" ||
                                info.status === "CANCEL"
                            }
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
const addSchedule = async (sche) => {
    await axios
        .request({
            method: "post",
            url: "http://172.20.5.236:8080/api/v1/scheduling?option",
            data: sche,
        })
        .then(
            (res) => {
                return res.data;
            },
            (err) => {
                console.log("Error:", err);
            },
        )
        .then((data) => {
            console.log("sucess");
        });
};

const Schedule = (props) => {
    const { info } = props;
    const handleOnAdd = async () => {
        if (fromDate == null) {
            alert("start time must be not null");
            return;
        }
        if (value == null) {
            alert("value must be not null");
            return;
        }
        const sche = toDate
            ? {
                  feedId: info.key,
                  value,
                  time: fromDate,
                  expTime: toDate,
              }
            : {
                  feedId: info.key,
                  value,
                  time: fromDate,
              };
        addSchedule(sche);
        setRefresh(true);
    };
    const handleOnDelete = async (schedule) => {
        deleteSchedule();
    };
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [value, setValue] = useState();
    const handleOnEditFrom = () => {
        showDateTimePicker(fromDate, "time", (e, value) => {
            setFromDate(value);
        });
    };
    const showDateTimePicker = (value, mode = "time", callback) => {
        DateTimePickerAndroid.open({
            value: new Date(),
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
    const deleteSchedule = async (sche) => {
        await axios
            .request({
                method: "delete",
                url: `http://172.20.5.236:8080/api/v1/scheduling/${sche._id}`,
            })
            .then(
                (res) => {
                    console.log("deleted");
                },
                (err) => {
                    console.log("Error:", err);
                },
            );
        setRefresh(true);
    };
    useEffect(() => {
        const getSchdules = async () => {
            setLoading(true);
            console.log(info);
            const result = await axios({
                method: "get",
                url: `http://172.20.5.236:8080/api/v1/scheduling?feed-id=${info.key}`,
            })
                .then(
                    (res) => {
                        return res.data;
                    },
                    (err) => {
                        console.log("Err:", err);
                    },
                )
                .then((data) => {
                    setSchedules(data.schedulings);
                    setLoading(false);
                    setRefresh(false);

                    return data.schedulings;
                });
            return result;
        };
        if (refresh) {
            setTimeout(() => {
                getSchdules();
            }, 200);
        }
    }, [refresh]);
    return (
        <>
            <View className="flex flex-col justify-center items-center w-[100%]">
                <View className="w-full justify-between flex flex-row">
                    <Text className="font-semibold text-[22px] px-[4]">
                        Schedule
                    </Text>
                    <Button
                        size="$2"
                        borderRadius={"$8"}
                        backgroundColor={"transparent"}
                        onPress={() => setShowModal((value) => !value)}
                    >
                        <Plus color="#656159" />
                    </Button>
                </View>
                {loading ? (
                    <Text>Loading</Text>
                ) : (
                    schedules.map((schedule, index) => (
                        <ScheduleCard
                            key={"sche-" + index}
                            info={schedule}
                            onDelete={(sche) => {
                                deleteSchedule(sche);
                            }}
                            onEdit={() => alert("edit card" + index)}
                        />
                    ))
                )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <Pressable
                    className="flex-1 items-center justify-center mt-22"
                    onPress={() => {
                        setShowModal(false);
                    }}
                >
                    <View
                        className="bg-white rounded-[20px] p-[35px] items-center shadow-[#000] h-[40vh] justify-between flex-col w-[90vw]"
                        styles={{
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <View className="flex flex-row w-full justify-between items-center">
                            <Text>Start time</Text>
                            <Text>
                                {fromDate
                                    ? fromDate.getHours() > 12
                                        ? fromDate.getHours() -
                                          12 +
                                          ":" +
                                          fromDate.getMinutes() +
                                          " AM"
                                        : fromDate.getHours() +
                                          ":" +
                                          fromDate.getMinutes() +
                                          " PM"
                                    : null}
                            </Text>
                            <Button onPress={handleOnEditFrom}>
                                <Text>Pick</Text>
                            </Button>
                        </View>
                        <View className="flex flex-row w-full justify-between items-center">
                            <Text>End time</Text>
                            <Text>
                                {toDate
                                    ? toDate.getHours() > 12
                                        ? toDate.getHours() -
                                          12 +
                                          ":" +
                                          toDate.getMinutes() +
                                          " AM"
                                        : toDate.getHours() +
                                          ":" +
                                          toDate.getMinutes() +
                                          " PM"
                                    : null}
                            </Text>
                            <Button onPress={handleOnEditTo}>
                                <Text>Pick</Text>
                            </Button>
                        </View>
                        <View className="flex flex-row w-full justify-between items-center">
                            <Text>Value</Text>
                            <TextInput
                                className="w-[100px] border rounded-[10px]  text-center"
                                onChangeText={(value) => setValue(value)}
                                value={value}
                                placeholder="Device value"
                                keyboardType="numeric"
                            />
                        </View>

                        <View className="w-full flex flex-row justify-end items-center gap-x-2">
                            <Pressable
                                className="rounded-[20px] p-[10px] border w-[80px] "
                                onPress={() => setShowModal(!showModal)}
                            >
                                <Text className="text-black font-bold text-center">
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                className="rounded-[20px] p-[10px]  w-[80px] bg-[#2196F3]"
                                onPress={() => {
                                    const res = handleOnAdd();
                                    setShowModal(false);
                                }}
                            >
                                <Text className="text-white font-bold text-center">
                                    Add
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export { Schedule };
