import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Fan from "./Fan";
import Lamp from "./Lamp";
function Device({ navigation, device }) {
    if (device == "Fan") {
        return <Fan powerState={false}></Fan>;
    } else if (device == "Lamp") {
        return <Lamp powerState={false}></Lamp>;
    }
}

export default Device;
