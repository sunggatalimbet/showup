"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export interface Quality {
    category: string;
    item: string;
    color: "purple" | "blue" | "green" | "pink";
}

interface QualityTagsProps {
    qualities: Quality[];
    selectedQualities: Quality[];
    onToggle: (quality: Quality) => void;
}

const colorVariants = {
    purple: "bg-purple-950/50 border-purple-700/50 hover:bg-purple-900/50 text-purple-200",
    blue: "bg-blue-950/50 border-blue-700/50 hover:bg-blue-900/50 text-blue-200",
    green: "bg-green-950/50 border-green-700/50 hover:bg-green-900/50 text-green-200",
    pink: "bg-pink-950/50 border-pink-700/50 hover:bg-pink-900/50 text-pink-200",
};

export function QualityTags({
    qualities,
    selectedQualities,
    onToggle,
}: QualityTagsProps) {
    const isSelected = (quality: Quality) =>
        selectedQualities.some(
            (sq) => sq.category === quality.category && sq.item === quality.item
        );

    return (
        <div className="flex flex-wrap gap-2">
            {qualities.map((quality, index) => (
                <motion.button
                    key={`${quality.category}::${quality.item}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onToggle(quality)}
                    className={cn(
                        "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                        colorVariants[quality.color],
                        isSelected(quality) &&
                            "ring-2 ring-offset-2 ring-offset-stone-800 ring-stone-400"
                    )}
                >
                    {quality.category}::{quality.item}
                </motion.button>
            ))}
        </div>
    );
}
