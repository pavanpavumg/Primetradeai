import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProtectedRoute({ children }) {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div className="p-10"><Skeleton count={5} /></div>;
    }

    // Determine if authenticated based on user presence
    return user ? children : <Navigate to="/login" replace />;
}
