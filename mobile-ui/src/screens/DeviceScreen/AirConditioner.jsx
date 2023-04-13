import { AirConditioner } from "../../components";
import { DeviceLayout, MainLayout } from "../../layouts";
// import { publishDeviceState, updateDeviceState } from "../../states";
import { useDispatch, useSelector } from "react-redux";

export default function AirConditionerScreen({ route, navigation }) {
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
            // dispatch(updateDeviceState(deviceId, value));
            // dispatch(publishDeviceState(deviceId, value));
        }
    };
    return (
        <MainLayout>
            <DeviceLayout deviceName="Air Device" navigation={navigation}>
                <AirConditioner
                    powerState={AirValue}
                    callback={updateAirValue}
                ></AirConditioner>
            </DeviceLayout>
        </MainLayout>
    );
}
