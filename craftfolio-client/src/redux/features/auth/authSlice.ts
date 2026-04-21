import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types";
import { baseURL } from "../../../config/envConfig";
import { toast } from "sonner";

const storedAuth = localStorage.getItem("auth");
const initialAuthState = storedAuth ? JSON.parse(storedAuth) : null;

const initialState: AuthState = {
    jwt: initialAuthState?.jwt || "",
    role_id: initialAuthState?.role_id || 99,
    userData: initialAuthState?.userData || {
        first_name: "",
        last_name: "",
        email: "",
        avatar_url: ""
    },
    loading: false,
    error: "",
};

export const registerUser = createAsyncThunk('auth/registerUser', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${baseURL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userData: payload
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return thunkAPI.rejectWithValue(errorMsg || "Register Failed");
        }

        const data = await response.json();
        
        if(data.success == false) {
            return thunkAPI.rejectWithValue(data.message || "Register Failed");
        }

        thunkAPI.dispatch(setAuthData(data));

        return data;
    } catch (error: any) {
        console.log("auth/registerUser error: ", error);
        return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (payload: any, thunkAPI) => {
    try {
        const response = await fetch(`${baseURL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userData: payload
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return thunkAPI.rejectWithValue(errorMsg || "Login Failed");
        }

        const data = await response.json();

        if(data.success == false) {
            return thunkAPI.rejectWithValue(data.error || "Login Failed");
        }

        thunkAPI.dispatch(setAuthData(data));

        return data;
    } catch (error: any) {
        console.log("auth/loginUser error: ", error);
        return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.jwt = action.payload.jwt;
            state.role_id = action.payload.role_id;
            state.userData = action.payload.userData;
            localStorage.setItem("auth", JSON.stringify({
                jwt: state.jwt,
                role_id: state.role_id,
                userData: state.userData
            }));
        },
        removeAuthData: (state) => {
            state.jwt = "";
            state.role_id = 99;
            state.userData = {
                first_name: "",
                last_name: "",
                email: "",
                avatar_url: ""
            };
            localStorage.removeItem("auth");
        }
    },
    extraReducers: (builder) => {
        builder
        // Register
        .addCase(registerUser.fulfilled, (state, action) => {
            state.jwt = action.payload.jwt;
            state.role_id = action.payload.role_id;
            state.userData = action.payload.userData;
            state.loading = false;
            state.error = "";
            localStorage.setItem("auth", JSON.stringify({
                jwt: state.jwt,
                role_id: state.role_id,
                userData: state.userData
            }));
        })
        .addCase(registerUser.rejected, (state, action) => {
            toast.error(action.payload as string || "Register Failed");
            state.jwt = "";
            state.role_id = 99;
            state.userData = {
                first_name: "",
                last_name: "",
                email: "",
                avatar_url: ""
            };
            state.loading = false;
            state.error = action.payload as string || "Register Failed";
            localStorage.removeItem("auth");
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        // Login
        .addCase(loginUser.fulfilled, (state, action) => {
            state.jwt = action.payload.jwt;
            state.role_id = action.payload.role_id;
            state.userData = action.payload.userData;
            state.loading = false;
            state.error = "";
            localStorage.setItem("auth", JSON.stringify({
                jwt: state.jwt,
                role_id: state.role_id,
                userData: state.userData
            }));
        })
        .addCase(loginUser.rejected, (state, action) => {
            toast.error(action.payload as string || "Login Failed");
            state.jwt = "";
            state.role_id = 99;
            state.userData = {
                first_name: "",
                last_name: "",
                email: "",
                avatar_url: ""
            };
            state.loading = false;
            state.error = action.payload as string || "Login Failed";
            localStorage.removeItem("auth");
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
    }
});

export const { setAuthData, removeAuthData } = authSlice.actions;
export default authSlice.reducer;

export type { AuthState };