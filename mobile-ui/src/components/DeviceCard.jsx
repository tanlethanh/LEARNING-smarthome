import { AirVent, Fan, Lamp, Lock } from "@tamagui/lucide-icons";
import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
const theme = {
    dark: {
        bgColor: "#454545",
        offColor: "#DADADA",
        onColor: "#FF6000",
        textColor: "#FAF8F1",
    },
    light: {
        bgColor: "#E5E5E5",
        offColor: "#D6D6D6",
        onColor: "black",
        textColor: "#363636",
    },
};
const defaultProps = {
    theme: "dark",
    device: {
        deviceName: "AIOT_FAN",
        key: "1",
        deviceId: "1234",
        type: "air",
        status: true,
    },
};
const DeviceCard = (props = defaultProps) => {
    const [status, setStatus] = useState(
        props.device && props.device.status ? props.device.status : true,
    );
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
    const handleToggle = () => {
        setStatus((value) => !value);
    };
    const getIcon = (type) => {
        if (type === "lamp") {
            return <Lamp size={"$2"} />;
        } else if (type === "air") {
            return <AirVent size="$2" />;
        } else if (type === "fan") {
            return <Fan size="$2" />;
        }
        return <Lock size="$2" />;
    };
    return (
        <Pressable
            className={
                "flex flex-col justify-between min-h-[190px] min-w-[180px] h-[190px] w-[170px] rounded-[20px] p-4"
            }
            style={{
                backgroundColor: theme[props.theme].bgColor,
                elevation: 4,
                shadowColor: "black",
            }}
            onPress={props.onPress}
        >
            <View className="flex-row justify-between items-center">
                <View className="flex flex-col items-start justify-start gap-2">
                    <View className="w-[45px] h-[45px] rounded-[100px] flex items-center justify-center bg-[#DADADA]">
                        {getIcon(
                            props.device && props.device.type
                                ? props.device.type
                                : "lamp",
                        )}
                    </View>
                    <View>
                        <Text
                            className={"text-[#363636] text-[17px] font-[600]"}
                            style={{ color: theme[props.theme].textColor }}
                        >
                            {props.device && props.device.name
                                ? props.device.name
                                : "Lamp"}
                        </Text>
                        <Text
                            className={"text-[13px] font-[400]"}
                            style={{ color: theme[props.theme].textColor }}
                        >
                            {props.device && props.device.num
                                ? props.device.num
                                : 1}{" "}
                            devices
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex flex-row justify-between items-center">
                <Text
                    className={"text-[14px]"}
                    style={{ color: theme[props.theme].textColor }}
                >
                    {status ? "On" : "Off"}
                </Text>
                <ToggleSwitch
                    isOn={status}
                    onToggle={() => handleToggle()}
                    offColor={theme[props.theme].offColor}
                    onColor={theme[props.theme].onColor}
                />
            </View>
        </Pressable>
    );
};

export { DeviceCard };
