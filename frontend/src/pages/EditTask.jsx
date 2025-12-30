import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: "", status: "todo" });

    useEffect(() => {
        api.get("/tasks", { params: { search: "", status: "all", limit: 1000 } }).then(res => {
            const data = res.data.tasks || res.data;
            const found = data.find(t => t._id === id);
            if (found) setTask(found);
        }).catch(() => toast.error("Failed to load task"));
    }, [id]);

    const updateTask = async () => {
        try {
            await api.put(`/tasks/${id}`, task);
            toast.success("Task Updated!");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task");
        }
    };

    return (
        <Layout>
            <PageTransition>
                <div className="max-w-md mx-auto mt-6 glass p-8 rounded-3xl shadow-2xl border border-white/20">
                    <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-[var(--gradient)]">
                        Edit Task
                    </h1>

                    <div className="mb-6">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase mb-2 block">Title</label>
                        <input
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none"
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase mb-2 block">Status</label>
                        <select
                            className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none appearance-none"
                            value={task.status}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}
                        >
                            <option value="todo">To-Do</option>
                            <option value="inprogress">In-Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="btn-primary w-full flex justify-center py-3 rounded-xl font-bold shadow-lg neon-glow"
                        onClick={updateTask}
                    >
                        Update Task
                    </motion.button>
                </div>
            </PageTransition>
        </Layout>
    );
}
