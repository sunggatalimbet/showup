import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DailyGoalsState {
    goals: string[];
}

const initialState: DailyGoalsState = {
    goals: [],
};

const dailyGoalsSlice = createSlice({
    name: "dailyGoals",
    initialState,
    reducers: {
        setDailyGoals: (state, action: PayloadAction<string[]>) => {
            state.goals = action.payload;
        },
        addGoal: (state) => {
            state.goals.push("");
        },
        updateGoal: (
            state,
            action: PayloadAction<{ index: number; text: string }>
        ) => {
            const { index, text } = action.payload;
            state.goals[index] = text;
        },
        removeGoal: (state, action: PayloadAction<number>) => {
            state.goals.splice(action.payload, 1);
        },
    },
});

export const { setDailyGoals, addGoal, updateGoal, removeGoal } =
    dailyGoalsSlice.actions;
export default dailyGoalsSlice.reducer;
