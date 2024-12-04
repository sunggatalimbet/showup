import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import type { Quality } from "~/components/quality-tags";

interface SelectedQualitiesState {
    selectedQualities: Quality[] | null;
}

const initialState: SelectedQualitiesState = {
    selectedQualities: null,
};

const selectedQualitiesSlice = createSlice({
    name: "selectedQualities",
    initialState,
    reducers: {
        setSelectedQuality: (state, action: PayloadAction<Quality[]>) => {
            state.selectedQualities = action.payload;
        },
    },
});

export const { setSelectedQuality } = selectedQualitiesSlice.actions;
export default selectedQualitiesSlice.reducer;
