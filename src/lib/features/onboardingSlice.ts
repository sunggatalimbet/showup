import { createSlice } from "@reduxjs/toolkit";

interface OnboardingState {
    hasCompletedOnboarding: boolean;
}

const initialState: OnboardingState = {
    hasCompletedOnboarding: false,
};

const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        completeOnboarding: (state) => {
            state.hasCompletedOnboarding = true;
        },
    },
});

export const { completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
