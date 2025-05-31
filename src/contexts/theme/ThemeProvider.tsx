import { useEffect, useState } from "react";
import type { Theme, ThemeProviderProps } from "../../types/models.types";
import { ThemeContext } from "./ThemeContext";


export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        let currentTheme = theme;
        if (theme === "system") {
            currentTheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches ? "dark" : "light";
        }

        root.classList.add(currentTheme);
    }, [theme]);

    // Xử lý thay đổi prefers-color-scheme khi theme là "system"
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (theme === "system") {
                const root = window.document.documentElement;
                root.classList.remove("light", "dark");
                const systemTheme = mediaQuery.matches ? "dark" : "light";
                root.classList.add(systemTheme);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setThemeState(newTheme);
        },
    };

    return (
        <ThemeContext.Provider {...props} value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
