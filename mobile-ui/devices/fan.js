import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const fanSlice = createSlice({
    name: "fan",
    initialState,
    reducers: {
        updateFan(state, action) {
            state.value = action.payload;
        }
    }
});

export const { updateFan } = fanSlice.actions;
export default fanSlice.reducer;

export const selectFan = (state) => state.fan.value;
