import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

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

const ConfirmationStep = ({ nextStep }: { nextStep: () => void }) => {
    return (
        <motion.div
            key="confirmation"
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
                <Check className="w-8 h-8" />
            </motion.div>
            <motion.div variants={childVariants} className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                    You&apos;re All Set!
                </h2>
                <p>
                    Your daily goals have been saved. Let&apos;s make today
                    count!
                </p>
            </motion.div>
            <motion.div variants={childVariants}>
                <Button onClick={nextStep} className="w-full">
                    <SignInButton mode={"modal"} />
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmationStep;
