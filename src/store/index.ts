import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {useAppDispatch,useAppSelector} from "./hooks"
import udataSlice from "./slices/udataSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        udata:udataSlice
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools:true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export {useAppDispatch,useAppSelector};