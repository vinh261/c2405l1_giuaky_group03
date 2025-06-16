import { ChartContext } from "@/contexts/ChartContext";
import { useContext } from "react";


export const useChart = () => {
    const context = useContext(ChartContext);

    if (context === undefined)
        throw new Error("useChart must be used within a ChartProvider");

    return context;
};
