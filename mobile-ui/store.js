import { configureStore } from '@reduxjs/toolkit'
import fanReducer from './devices/fan'
import sampleReducer from './devices/sample'

export const store = configureStore({
    reducer: {
        fan: fanReducer,
        sample: sampleReducer
    }
})
