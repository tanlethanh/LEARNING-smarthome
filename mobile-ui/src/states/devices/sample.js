import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

const sampleSlice = createSlice({
    name: "sample",
    initialState,
    reducers: {
        updateSample(state, action) {
            state.value = action.payload;
        },
    },
});

export const { updateSample } = sampleSlice.actions;
export default sampleSlice.reducer;

export const selectSample = (state) => state.fan.value;
