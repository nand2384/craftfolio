import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../config/envConfig";

import type { TemplateState } from "../../../types";

const initialState: TemplateState = {
  templates: [],
  loading: true,
  error: null,
};

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/api/templates`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return rejectWithValue(result.error || "Failed to fetch templates");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default templateSlice.reducer;
