import { DevicesScreen } from "./Devices";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectDevices } from "../../states";
import { useSelector } from "react-redux";

const DeviceStack = createNativeStackNavigator();

function DeviceScreen({ navigator }) {
    // const customCompare = (oldList, newList) => oldList === newList;
    const devices = useSelector(selectDevices);
    const temp = Object.values(useSelector(selectDevices))
        .filter((ele) => ele.room === "LR")
        .map((ele) => ele.name);

    console.log("-->", temp);

    return (
        <DeviceStack.Navigator initialRouteName="DeviceHome">
            <DeviceStack.Screen
                name="DeviceHome"
                options={{ headerShown: false }}
                component={DevicesScreen}
            />
            {/* {devices.map((device, index) => (
                <DeviceStack.Screen
                    key={"screen" + index}
                    name={device.deviceName + device.key}
                    options={{ headerShown: false }}
                    component={getScreen(device)}
                    initialParams={{
                        deviceId: device.deviceId,
                    }}
                />
            ))} */}
        </DeviceStack.Navigator>
    );
}

export { DeviceScreen };
