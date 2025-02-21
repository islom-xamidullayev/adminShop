import { configureStore } from "@reduxjs/toolkit";
import  { authSlice } from "./authSilce";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer, 
    },
})