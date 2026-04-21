import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/preview/dataSlice";
import authReducer from "./features/auth/authSlice";
import otpReducer from "./features/auth/otpSlice";

export const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        otp: otpReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;