import { DeviceLayout, MainLayout } from "../../layouts";
import { Fan } from "../../components";
import { useState } from "react";

export const FanScreen = ({ route, navigation }) => {
    const [fanValue, setFanValue] = useState(1);
    const updateFanValue = (value) => {
        setFanValue(value);
    };
    return (
        <MainLayout>
            <DeviceLayout deviceName="Fan Device" navigation={navigation}>
                <Fan powerState={fanValue} callback={updateFanValue}></Fan>
            </DeviceLayout>
        </MainLayout>
    );
};

export default FanScreen;
