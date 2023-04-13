import { DeviceLayout } from "../../layouts";
import { Lamp } from "../../components";
import { Text } from "react-native";
import { publishDeviceState, updateDeviceState } from "../../reducer/devices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function LampScreen ({ route, navigation }) {
    const { deviceId } = route.params
    // const lampValue = useSelector((state) => state.devices.devicesList.find((device) => (Number(device.deviceId) == Number(deviceId))).value)
    // const dispatch = useDispatch()
    // const updateLampValue = (value) => {
    //     console.log('Update: ', value)
    //     dispatch(updateDeviceState(deviceId, value))
    //     dispatch(publishDeviceState(deviceId, value))
    // }
    const [lampValue, setlampValue] = useState(1)
    const updatelampValue = (value) => {
        setlampValue(value)
    }
    return (
        <DeviceLayout
            deviceName="Lamp Device"
            navigation={navigation}
        >
            <Lamp powerState={lampValue} callback={updatelampValue}></Lamp>
        </DeviceLayout>
    );
}
