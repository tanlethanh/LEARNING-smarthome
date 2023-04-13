import { AirConditioner } from "../../components";
import { DeviceLayout } from "../../layouts";
import { publishDeviceState, updateDeviceState } from "../../reducer/devices";
import { useDispatch, useSelector } from "react-redux";

export function AirConditionerScreen({ route, navigation }) {
    const { deviceId } = route.params | undefined;
    const AirValue = deviceId
        ? useSelector(
              (state) =>
                  state.devices.devicesList.find(
                      (device) => Number(device.deviceId) == Number(deviceId),
                  ).value,
          )
        : 0;
    const dispatch = useDispatch();
    const updateAirValue = (value) => {
        if (deviceId != undefined) {
            dispatch(updateDeviceState(deviceId, value));
            dispatch(publishDeviceState(deviceId, value));
        }
    };
    return (
        <DeviceLayout deviceName="Air Device" navigation={navigation}>
            <AirConditioner
                powerState={AirValue}
                callback={updateAirValue}
            ></AirConditioner>
        </DeviceLayout>
    );
}
