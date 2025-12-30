import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

export default function AddTask() {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const createTask = async () => {
        if (!title.trim()) {
            toast.error("Title cannot be empty");
            return;
        }
        try {
            await api.post("/tasks", { title, status: "todo" });
            toast.success("Task Created!");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create task");
        }
    };

    return (
        <Layout>
            <PageTransition>
                <div className="max-w-md mx-auto mt-6 glass p-8 rounded-3xl shadow-2xl border border-white/20">
                    <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-[var(--gradient)]">
                        Add New Task
                    </h1>

                    <div className="mb-6">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase mb-2 block">
                            Task Title
                        </label>
                        <input
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none"
                            placeholder="Enter task details..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="btn-primary w-full flex justify-center py-3 rounded-xl font-bold shadow-lg neon-glow"
                        onClick={createTask}
                    >
                        Save Task
                    </motion.button>
                </div>
            </PageTransition>
        </Layout>
    );
}
