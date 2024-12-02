"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    progress: number;
    total: number;
}

export function ProgressBar({ progress, total }: ProgressBarProps) {
    const percentage = (progress / total) * 100;

    return (
        <div className="w-full h-4 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </div>
    );
}
