import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Device from "../components/device";

function DeviceSetting({ navigation }) {
    return (
        <SafeAreaView>
            <Device device={"Fan"}></Device>
        </SafeAreaView>
    );
}

export { DeviceSetting };
