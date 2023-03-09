import { configureStore } from "@reduxjs/toolkit";
import authUser from "./authUser";

export const store = configureStore({
    reducer: {
        authUser,
    }
});