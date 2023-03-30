import { configureStore } from "@reduxjs/toolkit";
import fanReducer from "./reducer/fan";
import deviceReducer from "./reducer/devices";
import { mqttClient } from "./reducer";
import  mqttMiddleWare  from "./mqttMiddleWare";
export const store = configureStore({
    reducer: {
        devices: deviceReducer
    },
    middleware: [mqttMiddleWare(mqttClient)]
});
