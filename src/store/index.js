import {configureStore} from "@reduxjs/toolkit";
import {homeReducer} from "../pages/contacts/store";

export const store = configureStore({
    reducer: {
        home: homeReducer
    }
})