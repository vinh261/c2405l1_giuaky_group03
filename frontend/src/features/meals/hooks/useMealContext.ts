import { useContext } from "react";
import { MealContext } from "../contexts/MealContext";


export const useMealContext = () => {
    const context = useContext(MealContext);

    if (context === undefined)
        throw new Error("useChart must be used within a MealContextProvider");

    return context;
};