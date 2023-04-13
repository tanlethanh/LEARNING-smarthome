import { AuthLayout } from "../layouts";
import { Text, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-gesture-handler";

export function LoginScreen() {
    return (
        <AuthLayout
            title="Smarthome Login"
            description="Welcome to Smart World"
        >
            <TextInput
                className="p-5 rounded-xl text-lg bg-white"
                placeholder="Enter username"
            ></TextInput>
            <TextInput
                className="p-5 rounded-xl text-lg bg-white"
                placeholder="Password"
            ></TextInput>
            <Text className="text-right text-base text-gray-500 mb-6">
                Recovery Password
            </Text>
            <TouchableOpacity className="p-5 rounded-xl bg-[#FD6B68] ">
                <Text className="text-lg text-center font-medium text-white">
                    Sign in
                </Text>
            </TouchableOpacity>
        </AuthLayout>
    );
}
