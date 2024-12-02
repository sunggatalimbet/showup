"use client";

import { motion } from "framer-motion";
import { StreakCounter } from "~/components/streak-counter";
import { Navigation } from "~/components/nav";
import { Card } from "~/components/ui/card";
import { useAppSelector } from "~/lib/hooks/redux";
import Link from "next/link";

export default function GoalsView() {
    const dailyGoals = useAppSelector((state) => state.dailyGoals.goals);

    return (
        <div className="min-h-screen bg-gradient-to-b pb-20">
            <div className="max-w-md mx-auto p-4 space-y-6">
                <StreakCounter streak={5} className="py-6" />

                <div className="space-y-4">
                    {dailyGoals.map((goal, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/goals/${index}/complete`}>
                                <Card className="p-4 transition-colors">
                                    <h3>{goal}</h3>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Navigation />
        </div>
    );
}
