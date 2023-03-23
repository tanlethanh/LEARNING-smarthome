import { configureStore } from "@reduxjs/toolkit";
import fanReducer from "./devices/fan";

export const store = configureStore({
    reducer: {
        fan: fanReducer
    }
});

