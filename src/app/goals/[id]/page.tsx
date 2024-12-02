"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "~/components/nav";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";
import { useAppSelector } from "~/lib/hooks/redux";
import type { RootState } from "~/lib/store";

interface Goal {
    id: number;
    text: string;
}

interface GoalSection {
    title: string;
    goals: Goal[];
    type: "fourMonth" | "month" | "daily";
}

export default function GoalsPage() {
    const dailyGoals = useAppSelector(
        (state: RootState) => state.dailyGoals.goals
    );

    const [sections, setSections] = useState<GoalSection[]>([
        {
            title: "4 Month Goals",
            type: "fourMonth",
            goals: [
                { id: 1, text: "Learn a new language" },
                { id: 2, text: "Run a marathon" },
            ],
        },
        {
            title: "Month Goals",
            type: "month",
            goals: [
                { id: 1, text: "Read 4 books" },
                { id: 2, text: "Start meditation practice" },
            ],
        },
        {
            title: "Daily Goals",
            type: "daily",
            goals: dailyGoals.map((goal, index) => ({
                id: index + 1,
                text: goal,
            })),
        },
    ]);

    const addGoal = (type: "fourMonth" | "month" | "daily") => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.type === type
                    ? {
                          ...section,
                          goals: [
                              ...section.goals,
                              { id: section.goals.length + 1, text: "" },
                          ],
                      }
                    : section
            )
        );
    };

    return (
        <div className="min-h-screen pb-24">
            <div className="max-w-md mx-auto p-4 space-y-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold"
                >
                    Goals
                </motion.h1>

                {sections.map((section, sectionIndex) => (
                    <motion.div
                        key={section.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {section.title}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addGoal(section.type)}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Goal
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {section.goals.map((goal) => (
                                <motion.div
                                    key={goal.id}
                                    whileHover={{ x: 4 }}
                                    className="group"
                                >
                                    <Card className="p-4 cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span>{goal.text}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
            <Navigation />
        </div>
    );
}
