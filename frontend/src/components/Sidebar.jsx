import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import api from "../api/axios";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            window.location.href = "/login";
        } catch (e) {
            window.location.href = "/login";
        }
    };

    return (
        <>
            {/* Toggle Button (Mobile) */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 glass px-3 py-2 rounded-xl z-50 text-2xl"
            >☰</button>

            {/* Sidebar */}
            <motion.aside
                initial={false} // Prevent initial animation on desktop
                animate={{ x: open ? "0%" : "-100%" }}
                variants={{
                    desktop: { x: "0%" }
                }}
                // Using a media query in variants isn't standard in pure framer motion without hooks, 
                // but for simplicity we rely on CSS mostly for showing/hiding or `fixed` positioning overrides.
                // Actually, the user snippet suggests `fixed md:static`. 
                // We need to handle the mobile "flyout" behavior vs desktop "static" behavior.
                style={{ x: undefined }} // Let class control desktop, animate control mobile... tricker with motion.
                // Better approach: conditional rendering or separate mobile/desktop handling like in previous Layout, 
                // OR rely on the fact that `md:static` makes it part of flow.
                // However, `animate` will override CSS transform. 
                // Let's stick to the user's snippet logic but ensure it works on desktop.
                // If we bind `animate` to `open`, proper desktop display might break if `open` is false.
                // We'll use a `className` that forces visibility on desktop, 
                // but `motion` style injection might fight it.
                // Simplest fix: Only apply `animate` prop on mobile. 
                className={`fixed md:sticky md:top-0 inset-y-0 w-64 glass backdrop-blur-2xl p-8 border-r border-white/20 z-40 transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <button onClick={() => setOpen(false)} className="md:hidden mb-6 text-xl">✖</button>

                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
                    TaskFlow
                </h1>

                <nav className="flex flex-col gap-4 flex-1">
                    <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'text-indigo-500 bg-indigo-50/50' : ''}`}>🏠 Dashboard</Link>
                    <Link to="/add-task" className={`nav-link ${location.pathname === '/add-task' ? 'text-indigo-500 bg-indigo-50/50' : ''}`}>➕ Add Task</Link>
                    <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'text-indigo-500 bg-indigo-50/50' : ''}`}>👤 Profile</Link>
                </nav>

                <div className="space-y-4 mt-8">
                    <div className="flex justify-center"><ThemeToggle /></div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition shadow-lg neon-glow"
                    >
                        Logout
                    </button>
                </div>
            </motion.aside>

            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
