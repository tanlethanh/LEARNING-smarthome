import FanScreen from "./Fan";
import AirConditionerScreen from "./AirConditioner";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
// import { adafruitClient } from "../../hooks/adafruit";
import { useEffect } from "react";
// import { Client } from "../../hooks/adafruit";

const DeviceTab = createBottomTabNavigator();

function DeviceScreen({ navigator }) {
    useEffect(() => {
        console.log("Hello world");
        // const adafruitClient = Client();
        // adafruitClient.helloWord();
        // console.log(adafruitClient)
    }, []);
    return (
        <DeviceTab.Navigator
            initialRouteName="fan"
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <DeviceTab.Screen
                name="Air conditioner"
                component={AirConditionerScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Fan"
                component={FanScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Light 2"
                component={FanScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Light 1"
                component={FanScreen}
            ></DeviceTab.Screen>
            <DeviceTab.Screen
                name="Machine"
                component={FanScreen}
            ></DeviceTab.Screen>
        </DeviceTab.Navigator>
    );
}

export { DeviceScreen };
