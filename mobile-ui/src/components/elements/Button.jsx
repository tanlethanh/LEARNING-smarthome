import { Text, TouchableOpacity } from "react-native";

export function AuthButton({ title }) {
    return (
        <TouchableOpacity className="p-5 rounded-xl bg-[#FD6B68] ">
            <Text className="text-lg text-center font-medium text-white">
                {title || "Button"}
            </Text>
        </TouchableOpacity>
    );
}
