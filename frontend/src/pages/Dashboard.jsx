import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // DEBOUNCE SEARCH
    const debounce = (fn, delay = 500) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const debouncedSearch = useCallback(debounce((val) => {
        setPage(1);
        fetchTasks(1, val, status, sort);
    }, 500), [status, sort]);

    const fetchTasks = async (pageNum = page, q = query, s = status, so = sort) => {
        setLoading(true);
        try {
            const res = await api.get("/tasks", { params: { search: q, status: s, sort: so, page: pageNum } });

            if (pageNum === 1) {
                setTasks(res.data.tasks);
            } else {
                setTasks((prev) => [...prev, ...res.data.tasks]);
            }
            setHasMore(res.data.hasMore);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            toast.success("Task deleted successfully");
            fetchTasks(1, query, status, sort);
            setPage(1);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete task");
        }
    }

    // Initial load
    useEffect(() => { fetchTasks(1); }, []);

    return (
        <Layout>
            <PageTransition>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-[var(--gradient)]">
                        ✨ TaskFlow Dashboard
                    </h1>
                    <Link to="/add-task">
                        <motion.button
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 250 }}
                            className="btn-primary hidden md:block shadow-neon neon-glow"
                        >
                            + New Task
                        </motion.button>
                    </Link>
                </div>

                {/* Search & Filters */}
                <div className="glass p-4 rounded-2xl shadow-sm mb-6 grid gap-3 sm:flex sm:gap-4">
                    <input
                        className="input flex-1 bg-transparent neon-glow"
                        placeholder="🔍 Search tasks..."
                        onChange={(e) => {
                            setQuery(e.target.value);
                            debouncedSearch(e.target.value);
                        }}
                    />
                    <select
                        className="input bg-transparent neon-glow"
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                            fetchTasks(1, query, e.target.value, sort);
                        }}
                    >
                        <option value="all">Filter: All Status</option>
                        <option value="todo">To-Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <select
                        className="input bg-transparent neon-glow"
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(1);
                            fetchTasks(1, query, status, e.target.value);
                        }}
                    >
                        <option value="latest">Sort: Newest</option>
                        <option value="oldest">Sort: Oldest</option>
                        <option value="az">Sort: A-Z</option>
                        <option value="za">Sort: Z-A</option>
                    </select>
                </div>

                {/* Task Cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {loading && page === 1 && (
                        [...Array(6)].map((_, i) => <Skeleton key={i} height={150} className="rounded-2xl" />)
                    )}

                    {tasks.map((t, index) => (
                        <motion.div
                            key={t._id}
                            layout // Animate layout changes
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: (i) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: i * 0.05, duration: 0.3 }
                                })
                            }}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02 }}
                            className="glass p-5 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg dark:text-gray-100">{t.title}</h3>
                                    <span className={`status-badge ${t.status}`}>{t.status}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Created: {new Date(t.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 flex justify-end gap-2 border-t border-gray-200/20 pt-3">
                                <Link to={`/edit/${t._id}`}>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="btn-primary text-sm py-1 px-3 shadow-md neon-glow"
                                    >
                                        Edit
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => deleteTask(t._id)}
                                    className="btn-danger text-sm py-1 px-3 shadow-md neon-glow"
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {!loading && tasks.length === 0 && (
                    <div className="text-center py-10 glass rounded-xl shadow-sm">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found.</p>
                        <Link to="/add-task" className="text-indigo-500 font-medium hover:underline mt-2 inline-block">Create your first task</Link>
                    </div>
                )}

                {/* LOAD MORE BUTTON */}
                {hasMore && !loading && tasks.length > 0 && (
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full glass text-indigo-500 dark:text-indigo-400 font-medium py-3 rounded-xl mt-6 hover:bg-white/20 transition border border-indigo-500/30 neon-glow"
                        onClick={() => {
                            const nextPage = page + 1;
                            setPage(nextPage);
                            fetchTasks(nextPage);
                        }}
                    >
                        Load More Tasks
                    </motion.button>
                )}

                {loading && page > 1 && <div className="text-center mt-4"><Skeleton height={40} width={200} /></div>}
            </PageTransition>
        </Layout>
    );
}
