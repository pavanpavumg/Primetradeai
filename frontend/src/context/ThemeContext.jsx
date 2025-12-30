import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [dark, setDark] = useState(
        localStorage.getItem("mode") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        const root = document.documentElement;
        dark ? root.classList.add("dark") : root.classList.remove("dark");
        localStorage.setItem("mode", dark ? "dark" : "light");
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
}
