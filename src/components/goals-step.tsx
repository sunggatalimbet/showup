import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { X, Plus } from "lucide-react";

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

const GoalsStep = ({
    dailyGoals,
    addGoal,
    updateGoal,
    removeGoal,
    nextStep,
}: {
    dailyGoals: string[];
    addGoal: () => void;
    updateGoal: (index: number, text: string) => void;
    removeGoal: (index: number) => void;
    nextStep: () => void;
}) => {
    return (
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
                <p>What would you like to achieve today?</p>
            </motion.div>
            <motion.div variants={childVariants} className="space-y-4">
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
                            onChange={(e) => updateGoal(index, e.target.value)}
                            className="flex-1"
                        />
                        {dailyGoals.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeGoal(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </motion.div>
                ))}
                <Button variant="outline" className="w-full" onClick={addGoal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Goal
                </Button>
            </motion.div>
            <motion.div variants={childVariants}>
                <Button
                    onClick={nextStep}
                    className="w-full"
                    disabled={dailyGoals.every((goal) => !goal.trim())}
                >
                    Continue
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default GoalsStep;
