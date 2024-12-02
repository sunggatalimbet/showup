import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AvatarState {
    level: number;
    experience: number;
}

const initialState: AvatarState = {
    level: 1,
    experience: 0,
};

const avatarSlice = createSlice({
    name: "avatar",
    initialState,
    reducers: {
        setLevel: (state, action: PayloadAction<number>) => {
            state.level = action.payload;
        },
        setExperience: (state, action: PayloadAction<number>) => {
            state.experience = action.payload;
        },
        incrementExperience: (state, action: PayloadAction<number>) => {
            state.experience += action.payload;
            if (state.experience >= 100) {
                state.level += 1;
                state.experience = 0; // Reset experience after leveling up
            }
        },
    },
});

export const { setLevel, setExperience, incrementExperience } =
    avatarSlice.actions;
export default avatarSlice.reducer;
