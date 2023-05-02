import { and } from "react-native-reanimated";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    devicesMap: {},
};

const deviceSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        addNewDevice(state, action) {
            const { key, metadata } = action.payload;

            const classifiedFields = metadata.name.split("_");
            // console.log(classifiedFields);

            if (
                classifiedFields.length == 3 &&
                classifiedFields[1] == "DEVICE"
            ) {
                const room = classifiedFields[0];
                const type = classifiedFields[2];
                state.devicesMap[key] = {
                    key,
                    name: metadata.name,
                    value: Number(metadata.last_value) || 0,
                    room,
                    type,
                    metadata,
                };
            }
        },
        updateDeviceState(state, action) {
            const { key, value } = action.payload;
            if (key == undefined || value == undefined)
                throw Error("Require both id and value");

            // Update value of device
            state.devicesMap[key].value = value;
        },
    },
});

export const { addNewDevice, updateDeviceState } = deviceSlice.actions;

export const deviceReducer = deviceSlice.reducer;

export const selectDevices = (state) => state.devices.devicesMap;
