import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { QualityTags } from "./quality-tags";
import type { Quality } from "./quality-tags";

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

export const availableQualities: Quality[] = [
    { category: "Pain", item: "Working with people", color: "purple" as const },
    { category: "Pain", item: "Navigation", color: "purple" as const },
    { category: "Observation", item: "Negative", color: "blue" as const },
    { category: "Observation", item: "Positive", color: "blue" as const },
    { category: "Stage", item: "Onboarding", color: "green" as const },
    { category: "Stage", item: "Growth", color: "green" as const },
    {
        category: "Features",
        item: "Permissions Management",
        color: "pink" as const,
    },
    { category: "Features", item: "Task Organization", color: "pink" as const },
];

type QualitiesStepProps = {
    qualities: Quality[] | null;
    nextStep: () => void;
    toggleQuality: (quality: Quality) => void;
};

const QualitiesStep = ({
    qualities,
    nextStep,
    toggleQuality,
}: QualitiesStepProps) => {
    return (
        <motion.div
            key="qualities"
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
                    What would you like to improve?
                </h2>
                <p>Select the areas you want to focus on in your journey.</p>
            </motion.div>
            <motion.div variants={childVariants}>
                <QualityTags
                    qualities={availableQualities}
                    selectedQualities={qualities ?? []}
                    onToggle={toggleQuality}
                />
            </motion.div>
            <motion.div variants={childVariants}>
                <Button
                    onClick={nextStep}
                    className="w-full"
                    disabled={qualities?.length === 0}
                >
                    Continue
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default QualitiesStep;
