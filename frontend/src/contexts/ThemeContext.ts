import type { ThemeProviderState } from "@/types/models.type";
import { createContext } from "react";


const initState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initState);