import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/preview/dataSlice";
import authReducer from "./features/auth/authSlice";
import otpReducer from "./features/auth/otpSlice";
import templateReducer from "./features/templates/templateSlice";

export const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        otp: otpReducer,
        templates: templateReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;