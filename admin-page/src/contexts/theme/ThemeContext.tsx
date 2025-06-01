import { createContext } from "react";
import type { ThemeProviderState } from "../../types/models.types";


const initState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initState);