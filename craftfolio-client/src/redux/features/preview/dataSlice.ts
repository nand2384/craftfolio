import { createSlice } from "@reduxjs/toolkit";
import type { BuilderState } from "../../../types";

const initialState: BuilderState = {
    templateId: "",
    data: {},
    links: {}
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setTemplate: (state, action) => {
            state.templateId = action.payload.templateId;
            state.data = action.payload.data;
            state.links = action.payload.links;
        },
        removeTemplate: (state, action) => {
            state.templateId = "";
            state.data = {};
            state.links = {};
        },
        updateField: (state, action) => {
            const { path, value } = action.payload;
            if (!path || path.length === 0) return;

            let current = state.data;
            for (let i = 0; i < path.length - 1; i++) {
                if (current[path[i]] === undefined) return;
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
        }
    }
});

export const { setTemplate, removeTemplate, toggleSection, updateField, addItemToArray, removeItemFromArray } = dataSlice.actions;
export default dataSlice.reducer;

export type { BuilderState };