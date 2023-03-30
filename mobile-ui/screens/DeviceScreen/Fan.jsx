import { DeviceLayout } from "../../layouts";
import { Fan } from "../../components";
import { Text } from 'react-native'
import { useEffect, useState, useContext } from "react";
import { DeviceContext } from '../index'
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { updateDeviceState , publishDeviceState} from "../../reducer/devices";
export default  FanScreen = ({route, navigation })=> {

    const {deviceId} = route.params; 
    const fanValue = useSelector((state) => state.devices.devicesList.find((device)=> (Number(device.deviceId) == Number(deviceId))).value);
    const dispatch = useDispatch();
    const updateFanValue = (value) => {
        console.log("Update: ", value);
        dispatch(updateDeviceState(deviceId, value));
        dispatch(publishDeviceState(deviceId, value))
    }
    return (
        <DeviceLayout deviceName="Fan Device">

            {/* <Text>Device: {deviceId}</Text> */}
            {/* <Text>FanValue: {fanValue}</Text> */}
            <Fan powerState={fanValue} callback={updateFanValue}></Fan>
        </DeviceLayout>
    );
}

