"use client";

import OnboardingFlow from "~/components/onboarding-flow";
import GoalsView from "~/components/goals-view";
import { useAppSelector } from "~/lib/hooks/redux";

export default function App() {
    const hasCompletedOnboarding = useAppSelector(
        (state) => state.onboarding.hasCompletedOnboarding
    );

    return (
        <div className="min-h-screen">
            {hasCompletedOnboarding ? <GoalsView /> : <OnboardingFlow />}
        </div>
    );
}
