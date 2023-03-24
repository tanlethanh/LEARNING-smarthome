import { createSlice } from "@reduxjs/toolkit";
import {mqttClient} from './index'
const initialState = {id: 0, value: 0 };

const fanSlice = createSlice({
    name: "fan",
    initialState,
    reducers: {
        updateFan(state, action) {
            state.value = action.payload.value;
        }
    }
});

export const { updateFan } = fanSlice.actions;
export default fanSlice.reducer;

export const selectFan = (state) => state.fan.value;
