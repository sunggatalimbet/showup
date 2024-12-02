"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "~/components/nav";
import { ProgressBar } from "~/components/progress-bar";
import { Card } from "~/components/ui/card";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "~/lib/hooks/redux";
import { incrementExperience } from "~/lib/features/avatarSlice";

interface Attribute {
    name: string;
    value: number;
    category: "physical" | "mental";
}

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const { level, experience } = useAppSelector((state) => state.avatar);
    const [attributes] = useState<Attribute[]>([
        { name: "Strength", value: 5, category: "physical" },
        { name: "Agility", value: 3, category: "physical" },
        { name: "Endurance", value: 4, category: "physical" },
        { name: "Intelligence", value: 6, category: "mental" },
        { name: "Wisdom", value: 4, category: "mental" },
        { name: "Willpower", value: 5, category: "mental" },
    ]);

    const handleAvatarClick = () => {
        dispatch(incrementExperience(10));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b pb-24">
            <div className="max-w-md mx-auto p-4 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-3xl font-bold">Avatar Customization</h1>
                    <p>
                        Build your avatar, the mirror of the real you. Every
                        achievement shapes your digital self.
                    </p>
                </motion.div>

                <motion.div
                    className="relative aspect-square max-w-[200px] mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAvatarClick}
                >
                    <Image
                        src="/placeholder.svg"
                        alt="Avatar"
                        fill
                        className="rounded-full object-cover cursor-pointer"
                    />
                </motion.div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="font-bold">Level {level}</span>
                        <span>{experience}/100 XP</span>
                    </div>
                    <ProgressBar progress={experience} total={100} />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Attributes</h2>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-medium">Physical</h3>
                            {attributes
                                .filter((attr) => attr.category === "physical")
                                .map((attribute) => (
                                    <Card key={attribute.name} className="p-4">
                                        <div className="flex justify-between items-center">
                                            <span>{attribute.name}</span>
                                            <div className="flex gap-1">
                                                {[...Array<number>(10)].map(
                                                    (_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-2 h-6 rounded-full ${
                                                                i <
                                                                attribute.value
                                                                    ? "bg-green-600"
                                                                    : "bg-black"
                                                            }`}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium">Mental</h3>
                            {attributes
                                .filter((attr) => attr.category === "mental")
                                .map((attribute) => (
                                    <Card key={attribute.name} className="p-4">
                                        <div className="flex justify-between items-center">
                                            <span>{attribute.name}</span>
                                            <div className="flex gap-1">
                                                {[...Array<number>(10)].map(
                                                    (_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-2 h-6 rounded-full ${
                                                                i <
                                                                attribute.value
                                                                    ? "bg-green-600"
                                                                    : "bg-black"
                                                            }`}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Navigation />
        </div>
    );
}
