"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/lib/hooks/redux";
import { setDailyGoals } from "~/lib/features/dailyGoalsSlice";
import { completeOnboarding } from "~/lib/features/onboardingSlice";
import { AnimatePresence } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import type { RootState } from "~/lib/store";

import WelcomeStep from "~/components/welcome-step";
import GoalsStep from "~/components/goals-step";
import ConfirmationStep from "~/components/confirmation-step";
import QualitiesStep, { type availableQualities } from "./qualities-step";
import { setSelectedQuality } from "~/lib/features/selectedQualitiesSlice";

export default function OnboardingFlow() {
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const dailyGoals = useAppSelector(
        (state: RootState) => state.dailyGoals.goals
    );
    const selectedQualities = useAppSelector(
        (state: RootState) => state.selectedQualities.selectedQualities
    );

    const addGoal = () => {
        const newGoals = [...dailyGoals, ""];
        dispatch(setDailyGoals(newGoals));
    };

    const updateGoal = (index: number, text: string) => {
        const newGoals = [...dailyGoals];
        newGoals[index] = text;
        dispatch(setDailyGoals(newGoals));
    };

    const removeGoal = (index: number) => {
        if (dailyGoals.length > 1) {
            const newGoals = dailyGoals.filter((_, i) => i !== index);
            dispatch(setDailyGoals(newGoals));
        }
    };

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            dispatch(
                setDailyGoals(dailyGoals.filter((goal) => goal.trim() !== ""))
            );
            dispatch(completeOnboarding());
        }
    };

    const toggleQuality = (quality: (typeof availableQualities)[0]) => {
        const newQualities = selectedQualities?.some(
            (q) => q.category === quality.category && q.item === quality.item
        )
            ? selectedQualities.filter(
                  (q) =>
                      !(
                          q.category === quality.category &&
                          q.item === quality.item
                      )
              )
            : [...(selectedQualities ?? []), quality];

        dispatch(setSelectedQuality(newQualities));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        {step === 1 && <WelcomeStep nextStep={nextStep} />}
                        {step === 2 && (
                            <QualitiesStep
                                nextStep={nextStep}
                                qualities={selectedQualities}
                                toggleQuality={toggleQuality}
                            />
                        )}
                        {step === 3 && (
                            <GoalsStep
                                dailyGoals={dailyGoals}
                                addGoal={addGoal}
                                updateGoal={updateGoal}
                                removeGoal={removeGoal}
                                nextStep={nextStep}
                            />
                        )}
                        {step === 4 && <ConfirmationStep nextStep={nextStep} />}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
