import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    devicesMap: {},
};

const deviceSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        addNewDevice(state, action) {
            const { id, metadata } = action.payload;
            state.devicesMap[id] = {
                value: 0,
                metadata,
            };
        },
        updateDeviceState(state, action) {
            const { id, value } = action.payload;
            if (!id || !value) throw Error("Require both id and value");

            // Update value of device
            state.devicesMap[id].value = value;
        },
    },
});

export const { addNewDevice, updateDeviceState } = deviceSlice.actions;

export const deviceReducer = deviceSlice.reducer;

export const selectDevices = (state) => state.devices.devicesMap;
