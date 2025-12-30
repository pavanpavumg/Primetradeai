import { createContext, useState, useEffect } from 'react';
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkUserLoggedIn = async () => {
        try {
            const res = await api.get("/auth/profile");
            setUser(res.data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const register = async (userData) => {
        const res = await api.post("/auth/register", userData);
        setUser(res.data.user);
        return res.data;
    };

    const login = async (userData) => {
        const res = await api.post("/auth/login", userData);
        setUser(res.data.user);
        return res.data;
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout failed", error);
        }
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
