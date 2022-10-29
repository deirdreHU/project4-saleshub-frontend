import {configureStore} from "@reduxjs/toolkit";
import {homeReducer} from "../pages/home/store";

export const store = configureStore({
    reducer: {
        home: homeReducer
    }
})