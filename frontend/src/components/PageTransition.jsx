import { motion } from "framer-motion";

export default function PageTransition({ children }) {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.12, duration: .4 }
        },
        exit: { opacity: 0, y: -20, transition: { duration: .3 } }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
