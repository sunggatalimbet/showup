import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "~/lib/features/counterSlice";
import onboardingReducer from "~/lib/features/onboardingSlice";
import dailyGoalsReducer from "~/lib/features/dailyGoalsSlice";
import avatarReducer from "~/lib/features/avatarSlice";

export const appStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            onboarding: onboardingReducer,
            dailyGoals: dailyGoalsReducer,
            avatar: avatarReducer,
        },
    });
};

export type AppStore = ReturnType<typeof appStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
