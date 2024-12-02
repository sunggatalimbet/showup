"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/lib/hooks/redux";

import { setDailyGoals } from "~/lib/features/dailyGoalsSlice";
import { completeOnboarding } from "~/lib/features/onboardingSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import type { RootState } from "~/lib/store";

export default function OnboardingFlow() {
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const dailyGoals = useAppSelector(
        (state: RootState) => state.dailyGoals.goals
    );

    const addGoal = () => {
        setDailyGoals([...dailyGoals, ""]);
    };

    const updateGoal = (index: number, text: string) => {
        const newGoals = [...dailyGoals];
        newGoals[index] = text;
        setDailyGoals(newGoals);
    };

    const removeGoal = (index: number) => {
        if (dailyGoals.length > 1) {
            const newGoals = dailyGoals.filter((_, i) => i !== index);
            setDailyGoals(newGoals);
        }
    };

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            dispatch(
                setDailyGoals(dailyGoals.filter((goal) => goal.trim() !== ""))
            );
            dispatch(completeOnboarding());
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: { ease: "easeInOut" },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 25,
            },
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="welcome"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 text-center"
                            >
                                <motion.div
                                    variants={childVariants}
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                                >
                                    <div className="w-8 h-8rounded-full" />
                                </motion.div>
                                <motion.div
                                    variants={childVariants}
                                    className="space-y-2"
                                >
                                    <h1 className="text-2xl font-bold tracking-tight ">
                                        Welcome to DailyGoals
                                    </h1>
                                    <p className="">
                                        Your personal daily goal tracking
                                        assistant. Let&apos;s set you up for
                                        success, one day at a time.
                                    </p>
                                </motion.div>
                                <motion.div variants={childVariants}>
                                    <Button
                                        onClick={nextStep}
                                        className="w-full"
                                    >
                                        Get Started
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="goals"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                <motion.div
                                    variants={childVariants}
                                    className="text-center space-y-2"
                                >
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        Set Your Daily Goals
                                    </h2>
                                    <p className="">
                                        What would you like to achieve today?
                                    </p>
                                </motion.div>
                                <motion.div
                                    variants={childVariants}
                                    className="space-y-4"
                                >
                                    {dailyGoals.map((goal, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 25,
                                            }}
                                            className="flex gap-2"
                                        >
                                            <Input
                                                placeholder="Enter your daily goal"
                                                value={goal}
                                                onChange={(e) =>
                                                    updateGoal(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1"
                                            />
                                            {dailyGoals.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeGoal(index)
                                                    }
                                                    className=""
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </motion.div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={addGoal}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Another Goal
                                    </Button>
                                </motion.div>
                                <motion.div variants={childVariants}>
                                    <Button
                                        onClick={nextStep}
                                        className="w-full"
                                        disabled={dailyGoals.every(
                                            (goal) => !goal.trim()
                                        )}
                                    >
                                        Continue
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="confirmation"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 text-center"
                            >
                                <motion.div
                                    variants={childVariants}
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                                >
                                    <Check className="w-8 h-8" />
                                </motion.div>
                                <motion.div
                                    variants={childVariants}
                                    className="space-y-2"
                                >
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        You&apos;re All Set!
                                    </h2>
                                    <p className="">
                                        Your daily goals have been saved.
                                        Let&apos;s make today count!
                                    </p>
                                </motion.div>
                                <motion.div variants={childVariants}>
                                    <Button
                                        onClick={nextStep}
                                        className="w-full"
                                    >
                                        Start Your Journey
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
