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

            const classifiedFields = metadata.name.split("_");
            // console.log(classifiedFields);

            if (classifiedFields.length >= 2) {
                const room = classifiedFields[0];
                const type = classifiedFields[1];

                state.devicesMap[id] = {
                    id,
                    name: metadata.name,
                    value: 0,
                    room,
                    type,
                    metadata,
                };
            }
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
