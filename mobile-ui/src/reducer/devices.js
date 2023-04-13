import {
    addDeviceAction,
    publishDeviceStateAction,
    updateDeviceStateAction,
} from "../actions/device";
const initialState = {
    devicesList: [],
};

function addDevice(deviceId, deviceKey, deviceName) {
    return {
        type: addDeviceAction,
        payload: { deviceId, deviceName, deviceKey },
    };
}

function updateDeviceState(deviceId, state) {
    return { type: updateDeviceStateAction, payload: { deviceId, state } };
}

function publishDeviceState(deviceId, state) {
    return { type: publishDeviceStateAction, payload: { deviceId, state } };
}
const deviceReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case addDeviceAction:
            console.log(
                "add-newdevie: ",
                action.payload.deviceName,
                action.payload.deviceId,
            );
            if (
                state.devicesList.find(
                    (device) => device.deviceId === action.payload.deviceId,
                )
            ) {
                return state;
            }
            const newState = {
                ...state,
                devicesList: [
                    ...state.devicesList,
                    { ...action.payload, value: 0 },
                ],
            };
            console.log(newState);
            return newState;
        case updateDeviceStateAction:
            if (
                state.devicesList.find(
                    (device) =>
                        device.deviceId === action.payload.deviceId &&
                        device.value === action.payload.state,
                )
            ) {
                return state;
            }
            console.log(
                "update value",
                action.payload.deviceId,
                action.payload.state,
            );
            return {
                ...state,
                devicesList: state.devicesList.map((device) => {
                    return device.deviceId === action.payload.deviceId
                        ? { ...device, value: action.payload.state }
                        : device;
                }),
            };
        default:
            return state;
    }
};

export { addDevice, updateDeviceState, publishDeviceState };
export default deviceReducer;

export const listDevices = (state) => state.devicesList;
