import { useContext } from "react";
import { ChartContext } from "../contexts/chart/ChartContext";

export const useChart = () => {
    const context = useContext(ChartContext);

    if (context === undefined)
        throw new Error("useChart must be used within a ChartProvider");

    return context;
};
