import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const { token } = useParams();
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const reset = async (e) => {
        e.preventDefault();
        if (!pwd) return toast.error("Password is required");
        if (pwd !== confirmPwd) return toast.error("Passwords do not match");

        setLoading(true);
        try {
            await api.post(`/auth/reset-password/${token}`, { newPassword: pwd });
            toast.success("Password reset successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to reset password");
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
                    Reset Password
                </h1>
                <p className="text-gray-500 dark:text-gray-300 mb-6 text-sm">
                    Enter your new password below.
                </p>

                <form onSubmit={reset} className="space-y-4">
                    <div className="text-left">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">New Password</label>
                        <input
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none mt-1"
                            type="password"
                            placeholder="New Password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Confirm Password</label>
                        <input
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none mt-1"
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-bold text-white shadow-lg btn-primary neon-glow disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
