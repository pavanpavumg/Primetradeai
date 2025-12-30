import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { dark, setDark } = useContext(ThemeContext);

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDark(!dark)}
            className="glass px-4 py-2 rounded-xl neon-glow text-gray-800 dark:text-white border border-white/20 font-medium"
        >
            {dark ? "☀ Light" : "🌙 Dark"}
        </motion.button>
    );
}
