import { useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const sendLink = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter your email");

        setLoading(true);
        try {
            const res = await api.post("/auth/forgot-password", { email });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .6, type: "spring" }}
                className="glass p-10 rounded-3xl w-full max-w-md text-center border border-white/20 shadow-2xl"
            >
                <h1 className="text-3xl font-bold mb-4 text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                    Forgot Password?
                </h1>
                <p className="text-gray-500 dark:text-gray-300 mb-6 text-sm">
                    Enter your email regarding your account and we'll send you a reset link.
                </p>

                <form onSubmit={sendLink} className="space-y-6">
                    <div className="text-left">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Email Address</label>
                        <input
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none mt-1"
                            placeholder="Enter your email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-bold text-white shadow-lg btn-primary neon-glow disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                </form>

                <div className="mt-6 text-sm">
                    <Link to="/login" className="text-indigo-400 font-bold hover:underline">Back to Login</Link>
                </div>
            </motion.div>
        </div>
    );
}
