import { configureStore } from '@reduxjs/toolkit'
import { mqttClient } from './reducer'
import deviceReducer from './reducer/devices'
import fanReducer from './reducer/fan'
import mqttMiddleWare from './mqttMiddleWare'
export const store = configureStore({
    reducer: {
        devices: deviceReducer
    },
    middleware: [mqttMiddleWare(mqttClient)]
})
