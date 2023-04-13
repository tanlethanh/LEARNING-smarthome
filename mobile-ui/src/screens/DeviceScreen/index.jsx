import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectDevices } from "../../states";
import { useSelector } from "react-redux";
import AirConditionerScreen from "./AirConditioner";
import FanScreen from "./Fan";
import LampScreen from "./Lamp";
import LockScreen from "./Lock";

const DeviceStack = createNativeStackNavigator();

function DeviceScreen() {
    return (
        <DeviceStack.Navigator>
            <DeviceStack.Screen
                name={"LIGHT"}
                options={{ headerShown: false }}
                component={LampScreen}
            />
            <DeviceStack.Screen
                name={"AIRCOND"}
                options={{ headerShown: false }}
                component={AirConditionerScreen}
            />
            <DeviceStack.Screen
                name={"LOCK"}
                options={{ headerShown: false }}
                component={LockScreen}
            />
            <DeviceStack.Screen
                name={"FAN"}
                options={{ headerShown: false }}
                component={FanScreen}
            />
        </DeviceStack.Navigator>
    );
}

export { DeviceScreen };
