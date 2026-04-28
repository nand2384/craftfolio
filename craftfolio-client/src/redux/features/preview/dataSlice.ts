import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataState } from "../../../types";
import { baseURL } from "../../../config/envConfig";
import type { RootState } from "../../store";

const initialState: DataState = {
    templateId: "",
    craftId: null,
    craftName: "Untitled Craft",
    data: {},
    links: {},
    userCrafts: [],
    loadingCrafts: false,
};

export const saveCraft = createAsyncThunk("data/saveCraft", async (_, thunkAPI) => {
    try {
        const state: RootState = thunkAPI.getState() as RootState;
        const { craftId, craftName, data, links, templateId } = state.data;
        const token = state.auth.jwt;

        const response = await fetch(`${baseURL}/api/crafts/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                template_id: templateId,
                craft_id: craftId,
                craft_name: craftName,
                data: data,
                links: links
            })
        });

        const result = await response.json();
        if(!response.ok || result.success === false) {
            throw new Error(result.message || "Failed to save craft");
        };

        return result.data;
    } catch (error) {
        console.error("Save Craft Error: ", error);
        throw error;
    }
});

export const fetchUserCrafts = createAsyncThunk("data/fetchUserCrafts", async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.jwt;

        if (!token || token === "undefined" || token === "null") {
            return thunkAPI.rejectWithValue("No token provided");
        }

        const response = await fetch(`${baseURL}/api/crafts/fetch`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();
        if(!response.ok || result.success == false) {
            throw new Error(result.message || "Failed to fetch crafts");
        };

        return result.data;
    } catch (error) {
        console.error("Fetch User Crafts Error: ", error);
        throw error;
    }
});

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setTemplate: (state, action) => {
            state.templateId = action.payload.templateId ?? "";
            state.craftId = action.payload.craftId ?? null;
            state.craftName = action.payload.craftName ?? "Untitled Craft";
            state.data = action.payload.data ?? {};
            state.links = action.payload.links ?? {};
        },
        removeTemplate: (state, _action) => {
            state.templateId = "";
            state.craftId = null;
            state.craftName = "Untitled Craft";
            state.data = {};
            state.links = {};
        },
        updateField: (state, action) => {
            const { path, value } = action.payload;
            let current = state.data;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
        },
        toggleSection: (state, action) => {
            const { sectionId } = action.payload;
            if (state.data.sections) {
                state.data.sections[sectionId] = !state.data.sections[sectionId];
            }
        },
        addItemToArray: (state, action) => {
            const { path, item } = action.payload;
            let current = state.data;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            const array = current[path[path.length - 1]];
            if (Array.isArray(array)) {
                array.push(item);
            }
        },
        removeItemFromArray: (state, action) => {
            const { path, index } = action.payload;
            let current = state.data;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            const array = current[path[path.length - 1]];
            if (Array.isArray(array)) {
                array.splice(index, 1);
            }
        },
        setCraftInfo: (state, action: PayloadAction<{ craftId: string; craftName: string }>) => {
            state.craftId = action.payload.craftId;
            state.craftName = action.payload.craftName;
        },
        updateCraftName: (state, action: PayloadAction<string>) => {
            state.craftName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveCraft.fulfilled, (state, action) => {
            state.craftId = action.payload.craft_id;
            state.craftName = action.payload.craft_name;
        });

        builder.addCase(fetchUserCrafts.fulfilled, (state, action) => {
            state.userCrafts = action.payload;
            state.loadingCrafts = false;
        })
        .addCase(fetchUserCrafts.pending, (state) => {
            state.loadingCrafts = true;
        })
        .addCase(fetchUserCrafts.rejected, (state) => {
            state.loadingCrafts = false;
        })
    }
});

export const { setTemplate, removeTemplate, toggleSection, updateField, addItemToArray, removeItemFromArray, setCraftInfo, updateCraftName } = dataSlice.actions;
export default dataSlice.reducer;

export type { DataState };