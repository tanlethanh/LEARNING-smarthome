import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectDevices } from "../../states";
import { useSelector } from "react-redux";
import AirConditionerScreen from "./AirConditioner";
import FanScreen from "./Fan";
import LampScreen from "./Lamp";
import LockScreen from "./Lock";

const DeviceStack = createNativeStackNavigator();

function DeviceScreen() {
    const devices = useSelector(selectDevices);

    const getScreen = (deviceType) => {
        console.log(deviceType, "<-- type");
        if (deviceType == "LIGHT") {
            return LampScreen;
        } else if (deviceType == "AIRCOND") {
            return AirConditionerScreen;
        } else if (deviceType == "LOCK") {
            return LockScreen;
        } else if (deviceType == "FAN") {
            return FanScreen;
        } else {
            return FanScreen;
        }
    };

    return (
        <DeviceStack.Navigator>
            {Object.values(devices).map((device, index) => {
                console.log(device.id, "<--");
                return (
                    <DeviceStack.Screen
                        key={index}
                        name={String(device.id)}
                        options={{ headerShown: false }}
                        component={getScreen(device.type)}
                    />
                );
            })}
        </DeviceStack.Navigator>
    );
}

export { DeviceScreen };
