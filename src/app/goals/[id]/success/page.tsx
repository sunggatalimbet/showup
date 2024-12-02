"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { StreakCounter } from "~/components/streak-counter";
import { Navigation } from "~/components/nav";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();
    const controls = useAnimation();

    useEffect(() => {
        void controls.start({
            scale: [1, 1.2, 1],
            transition: { duration: 0.5, times: [0, 0.5, 1] },
        });
    }, [controls]);

    return (
        <div className="min-h-screen bg-gradient-to-b pb-20">
            <div className="max-w-md mx-auto p-4">
                <motion.div
                    className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div animate={controls}>
                        <StreakCounter streak={6} />
                    </motion.div>

                    <motion.h1
                        className="text-2xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Congratulations!
                    </motion.h1>

                    <motion.p
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        You&apos;ve completed your goal and increased your
                        streak!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Button
                            onClick={() => router.push("/")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Back to Goals
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
            <Navigation />
        </div>
    );
}
