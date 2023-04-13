import { AirConditioner } from "../../components";
import { DeviceLayout, MainLayout } from "../../layouts";
// import { publishDeviceState, updateDeviceState } from "../../states";
import { Text } from "react-native";
import {
    deviceTypes,
    roomTypes,
    selectDevices,
    updateDeviceState,
} from "../../states";
import { useDispatch, useSelector } from "react-redux";

export default function AirConditionerScreen({ route, navigation }) {
    const { deviceKey } = route.params;
    const AirDevice = useSelector(selectDevices)[deviceKey];
    const dispatch = useDispatch();

    const updateAirValue = (value) => {
        if (AirDevice != undefined) {
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
                    roomTypes.find((ele) => ele.key === AirDevice.room).name
                }
                deviceName={
                    deviceTypes.find((ele) => ele.key === AirDevice.type).name
                }
                navigation={navigation}
            >
                {AirDevice ? (
                    <AirConditioner
                        updateValue={updateAirValue}
                        device={AirDevice}
                    ></AirConditioner>
                ) : (
                    <Text>Not found this device</Text>
                )}
            </DeviceLayout>
        </MainLayout>
    );
}
