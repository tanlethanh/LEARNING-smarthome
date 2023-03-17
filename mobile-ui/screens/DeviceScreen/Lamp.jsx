import { DeviceLayout } from "../../layouts";
import { Lamp } from "../../components";
import { Text } from 'react-native'
import { useEffect, useState, useContext } from "react";
import { DeviceContext } from '../index'

export default function LampScreen({ navigation }) {
    const deviceContext = useContext(DeviceContext)
    const lampvalue = deviceContext.lampValue
    const setLampvalue = deviceContext.setLampValue
    const mqttClient = deviceContext.mqttClient
    const feedid = deviceContext.feeds.find(o => o.key == 'aiot-light').id
    console.log(feedid);
    useEffect(() => {
        const update = async (value) => {
            await mqttClient.publish(feedid, value)
            console.log('async: ', value);
        }
        update(lampvalue)
    }, [lampvalue])

    const handleChange = async (nvalue) => {
        if (nvalue == lampvalue) {
            return
        }
        setLampvalue(nvalue)
    }
    return (
        <DeviceLayout deviceName="Lamp Device">
            <Lamp powerState={lampvalue} callback={handleChange}></Lamp>
        </DeviceLayout>
    );
}