import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../config/envConfig";
import type { OtpState } from "../../../types";

const initialState: OtpState = {
    email: "",
    otp: 999999,
    loading: false
};

export const sendOtp = createAsyncThunk<any, string>('otp/sendOtp', async (payload, thunkAPI) => {
    try {
        const email = payload;
        const response = await fetch(`${baseURL}/api/auth/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return thunkAPI.rejectWithValue(errorMsg || "Send OTP Failed");
        }

        const data = await response.json();

        if(data.success == false) return thunkAPI.rejectWithValue(data.message || "Send OTP Failed");

        return data;
    } catch (error: any) {
        console.log("otp/sendOtp error: ", error);
        return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
});

export const verifyOtp = createAsyncThunk<any, { email: string, otp: number }>('otp/verifyOtp', async (payload, thunkAPI) => {
    try {
        const email = payload.email;
        const otp = payload.otp;

        const response = await fetch(`${baseURL}/api/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return thunkAPI.rejectWithValue(errorMsg || "Verify OTP Failed");
        }

        const data = await response.json();

        if(data.success == false) return thunkAPI.rejectWithValue(data.message || "Verify OTP Failed");

        return data;
    } catch (error: any) {
        console.log("otp/verifyOtp error: ", error);
        return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
});

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email;
        },
        setOtp: (state, action) => {
            state.otp = action.payload.otp;
        },
        setOtpData: (state, action) => {
            state.email = action.payload.email;
            state.otp = action.payload.otp;
        },
        removeOtpData: (state, action) => {
            state.email = "";
            state.otp = 999999;
        }
    },
    extraReducers: (builder) => {
        builder
            // Send OTP
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendOtp.rejected, (state) => {
                state.loading = false;
            })
            // Verify OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { setEmail, setOtp, setOtpData, removeOtpData } = otpSlice.actions;
export default otpSlice.reducer;

export type { OtpState };