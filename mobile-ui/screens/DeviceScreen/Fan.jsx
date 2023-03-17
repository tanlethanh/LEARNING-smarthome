import { DeviceLayout } from "../../layouts";
import { Fan } from "../../components";
import { Text } from 'react-native'
import { useEffect, useState } from "react";

export default function FanScreen({ navigation, fanValue, callback }) {
    // const info = navigation.options;
    // console.log(info);
    // const feed = info.feed;
    // const mqttClient = info.mqttClient
    // const value = info.fanValue
    const [value, setValue] = useState(fanValue)
    useEffect(() => { setValue(fanValue) }, [fanValue])
    useEffect(async () => {
        // const res = await  mqttClient.publish(feed, value)
        console.log("assync: ", value);
    }, [value])
    const handleChange = (nvalue) => {
        // setValue(nvalue);
        callback(nvalue)
        print("change value to: ", nvalue)
    }
    return (
        <DeviceLayout deviceName="Fan Device">
            <Fan powerState={value} callback={handleChange}></Fan>
        </DeviceLayout>
    );
}
