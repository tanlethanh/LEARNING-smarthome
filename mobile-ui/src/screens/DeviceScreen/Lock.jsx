import { DeviceLayout, MainLayout } from "../../layouts";
import { Text } from "react-native";
import {
    deviceTypes,
    roomTypes,
    selectDevices,
    updateDeviceState,
} from "../../states";
import { useDispatch, useSelector } from "react-redux";
import Lock from "../../components/Lock";

export default function LockScreen({ route, navigation }) {
    const { deviceKey } = route.params;
    const LockDevice = useSelector(selectDevices)[deviceKey];
    const dispatch = useDispatch();

    const updateLockValue = (value) => {
        if (LockDevice != undefined) {
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
                    roomTypes.find((ele) => ele.key === LockDevice.room).name
                }
                deviceName={
                    deviceTypes.find((ele) => ele.key === LockDevice.type).name
                }
                navigation={navigation}
            >
                {LockDevice ? (
                    <Lock
                        updateValue={updateLockValue}
                        device={LockDevice}
                    ></Lock>
                ) : (
                    <Text>Not found this device</Text>
                )}
            </DeviceLayout>
        </MainLayout>
    );
}
