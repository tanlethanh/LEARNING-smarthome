import { DeviceLayout } from "../../layouts";
import { Lamp } from "../../components";
import { Text } from 'react-native'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDeviceState, publishDeviceState } from "../../reducer/devices";

export default function LampScreen({ route, navigation }) {
    const {deviceId} = route.params; 
    const lampValue = useSelector((state) => state.devices.devicesList.find((device)=> (Number(device.deviceId) == Number(deviceId))).value);
    const dispatch = useDispatch();
    const updateLampValue = (value) => {
        console.log("Update: ", value);
        dispatch(updateDeviceState(deviceId, value));
        dispatch(publishDeviceState(deviceId, value))
    }
    return (
        <DeviceLayout deviceName="Lamp Device">
            <Lamp powerState={lampValue} callback={updateLampValue}></Lamp>
        </DeviceLayout>
    );
}