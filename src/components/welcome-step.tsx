import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";

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

const WelcomeStep = ({ nextStep }: { nextStep: () => void }) => {
    return (
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
                <div className="w-8 h-8 rounded-full" />
            </motion.div>
            <motion.div variants={childVariants} className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight ">
                    Welcome to DailyGoals
                </h1>
                <p>
                    Your personal daily goal tracking assistant. Let&apos;s set
                    you up for success, one day at a time.
                </p>
            </motion.div>
            <motion.div variants={childVariants}>
                <Button onClick={nextStep} className="w-full">
                    Get Started
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeStep;
