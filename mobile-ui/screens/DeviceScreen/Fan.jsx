import { DeviceLayout } from "../../layouts";
import { Fan } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectFan } from "../../devices/fan";

export default function FanScreen() {
    const fanValue = useSelector(selectFan);
    const dispatch = useDispatch();

    const updateFanValue = (value) => {
        dispatch(updateFan(value));
    };

    return (
        <DeviceLayout deviceName="Fan Device">
            {console.log("fanValue " + fanValue)}
            <Fan></Fan>
        </DeviceLayout>
    );
}
