import { configureStore } from "@reduxjs/toolkit";
import { deviceReducer } from "./devices";
import { mqttClient } from "./adafruit";
import mqttMiddleWare from "./mqttMiddleWare";

export const store = configureStore({
    reducer: {
        devices: deviceReducer,
    },
    middleware: [mqttMiddleWare(mqttClient)],
});
