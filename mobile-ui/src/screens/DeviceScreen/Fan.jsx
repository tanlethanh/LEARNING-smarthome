import { DeviceLayout, MainLayout } from "../../layouts";
import { Fan } from "../../components";
import { Text } from "react-native";
import {
    deviceTypes,
    roomTypes,
    selectDevices,
    updateDeviceState,
} from "../../states";
import { useDispatch, useSelector } from "react-redux";
export default function FanScreen({ route, navigation }) {
    const { deviceKey } = route.params;
    const FanDevice = useSelector(selectDevices)[deviceKey];
    const dispatch = useDispatch();

    const updateFanValue = (value) => {
        if (FanDevice != undefined) {
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
                    roomTypes.find((ele) => ele.key === FanDevice.room).name
                }
                deviceName={
                    deviceTypes.find((ele) => ele.key === FanDevice.type).name
                }
                navigation={navigation}
            >
                {FanDevice ? (
                    <Fan updateValue={updateFanValue} device={FanDevice}></Fan>
                ) : (
                    <Text>Not found this device</Text>
                )}
            </DeviceLayout>
        </MainLayout>
    );
}
