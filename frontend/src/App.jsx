import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ThemeProvider from "./context/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/add-task" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/" element={<Login />} />
            </Routes>
        </ThemeProvider>
    );
}
