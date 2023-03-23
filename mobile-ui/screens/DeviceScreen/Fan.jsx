import { DeviceLayout } from "../../layouts";
import { Fan } from "../../components";
import { Text } from 'react-native'
import { useEffect, useState, useContext } from "react";
import { DeviceContext } from '../index'

export default function FanScreen({ navigation }) {
    const deviceContext = useContext(DeviceContext)
    const fanvalue = deviceContext.fanValue
    const setFanvalue = deviceContext.setFanValue
    const mqttClient = deviceContext.mqttClient
    const feedid = deviceContext.feeds.find(o => o.key == 'aiot-fan').id
    useEffect(() => {
        // console.log("assync: ", fanvalue);
        // console.log("rerender fan screen when fanvalue:", fanvalue);
        const update = async (value) => {
            await mqttClient.publish(feedid, value)
            console.log('async: ', value);
        }
        update(fanvalue)
    }, [fanvalue])
    const handleChange = async (nvalue) => {
        setFanvalue(nvalue)

        if (nvalue == fanvalue) {
            return
        }
    }
    return (
        <DeviceLayout deviceName="Fan Device">
            <Fan powerState={fanvalue} callback={handleChange}></Fan>
        </DeviceLayout>
    );
}