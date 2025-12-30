import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email"), password = form.get("password");

        try {
            await api.post("/auth/login", { email, password });
            toast.success("Welcome Back ✨");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error(error);
            toast.error("Invalid credentials ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .6, type: "spring" }}
                className="glass p-10 rounded-3xl w-full max-w-sm text-center border border-white/20 shadow-2xl"
            >
                <h2 className="text-4xl font-bold mb-2 text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                    Login
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mb-8">Welcome back to TaskFlow</p>

                <form onSubmit={handleLogin}>
                    <div className="mb-4 text-left">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Email</label>
                        <input type="email" name="email" placeholder="john@example.com"
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none" required />
                    </div>

                    <div className="mb-8 text-left">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Password</label>
                        <input type="password" name="password" placeholder="••••••••"
                            className="neon-glow p-3 w-full rounded-xl mb-2 glass bg-white/50 dark:bg-black/20 focus:outline-none" required />
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-full py-3 rounded-xl font-bold text-white shadow-lg btn-primary neon-glow"
                    >
                        Login 🚀
                    </motion.button>
                </form>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account? <Link to="/register" className="text-indigo-400 font-bold hover:underline">Register</Link>
                </div>
            </motion.div>
        </div>
    );
}
