import { motion } from "framer-motion";

export default function GlassModal({ children, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xl flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: .8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .8, opacity: 0 }}
                transition={{ type: "spring", damping: 14, stiffness: 100 }}
                className="glass border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {children}

                <motion.button
                    whileTap={{ scale: .95 }}
                    onClick={onClose}
                    className="mt-6 bg-red-500 text-white w-full py-2 rounded-xl neon-glow font-medium hover:bg-red-600 transition"
                >
                    Close
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
