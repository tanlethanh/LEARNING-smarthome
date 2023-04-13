import {
    addDeviceAction,
    publishDeviceStateAction,
    updateDeviceStateAction,
} from "../actions/device";
const initialState = {
    devicesList: [],
};

export function addDevice(deviceId, deviceKey, deviceName) {
    return {
        type: addDeviceAction,
        payload: { deviceId, deviceName, deviceKey },
    };
}

export function updateDeviceState(deviceId, state) {
    return { type: updateDeviceStateAction, payload: { deviceId, state } };
}

export function publishDeviceState(deviceId, state) {
    return { type: publishDeviceStateAction, payload: { deviceId, state } };
}

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case addDeviceAction:
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

export const listDevices = (state) => state.devicesList;
