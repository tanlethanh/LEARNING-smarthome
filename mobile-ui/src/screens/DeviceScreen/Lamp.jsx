import { DeviceLayout, MainLayout } from "../../layouts";
import { Lamp } from "../../components";
import { Text } from "react-native";
import {
    deviceTypes,
    roomTypes,
    selectDevices,
    updateDeviceState,
} from "../../states";
import { useDispatch, useSelector } from "react-redux";

export default function LampScreen({ route, navigation }) {
    const { deviceKey } = route.params;
    const LampDevice = useSelector(selectDevices)[deviceKey];
    const dispatch = useDispatch();

    const updateLampValue = (value) => {
        if (LampDevice != undefined) {
            dispatch(
                updateDeviceState({
                    key: deviceKey,
                    value,
                }),
            );
        }
    };

    return (
        <MainLayout>
            <DeviceLayout
                roomName={
                    roomTypes.find((ele) => ele.key === LampDevice.room).name
                }
                deviceName={
                    deviceTypes.find((ele) => ele.key === LampDevice.type).name
                }
                navigation={navigation}
            >
                {LampDevice ? (
                    <Lamp
                        updateValue={updateLampValue}
                        device={LampDevice}
                    ></Lamp>
                ) : (
                    <Text>Not found this device</Text>
                )}
            </DeviceLayout>
        </MainLayout>
    );
}
