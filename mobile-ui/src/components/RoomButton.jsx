import { Button } from "tamagui";
import { Text, View } from "react-native";
import React from "react";

export const RoomButton = ({ onPress, isChosen, name }) => {
    return (
        <Button
            className="w-auto h-fit rounded-[20px] bg-transparent flex flex-col justify-start items-center gap-[5px] "
            onPress={onPress}
        >
            <Text
                className={
                    isChosen
                        ? "font-[600] text-[17px] text-black h-[21px]"
                        : "h-[21px] font-[600] text-[15px] text-[#838A8F]"
                }
            >
                {name}
            </Text>
            {isChosen && (
                <View className="w-[10px] h-[10px] rounded-[100px] bg-[#FF8A00]"></View>
            )}
        </Button>
    );
};
