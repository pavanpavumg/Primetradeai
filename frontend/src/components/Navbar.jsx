import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed", error);
            window.location.href = "/login"; // Force redirect anyway
        }
    };

    return (
        <nav className="p-4 bg-gray-900 text-white flex justify-between">
            <div className="flex gap-4">
                <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <Link to="/add-task" className="hover:text-gray-300">Add Task</Link>
                <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </nav>
    );
}
