import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";


export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined)
        throw new Error("Theme must be used within a ThemeProvider");

    return context;
};