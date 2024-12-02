"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakCounterProps {
    streak: number;
    className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Flame className="w-8 h-8 text-green-500" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 text-green-500"
                    animate={{
                        opacity: [0.5, 0, 0.5],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Flame className="w-8 h-8" />
                </motion.div>
            </motion.div>
            <span className="text-2xl font-bold">{streak} Day Streak!</span>
        </div>
    );
}
