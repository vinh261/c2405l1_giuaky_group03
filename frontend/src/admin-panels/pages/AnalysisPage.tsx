import React from "react";
import { useChart } from "../hooks/useChart";
import { useProcessedChartData } from "../hooks/useProcessedChartData";
import Chart from "../components/ui/chart/Chart";
import TotalAmount from "../components/ui/analysis/TotalAmount";


const Analysis = () => {
    const { range, filteredData, currentChart } = useChart();

    const normalizedRange = {
        from: range.from ? new Date(range.from) : undefined,
        to: range.to ? new Date(range.to) : undefined,
    };

    const { chartData, xAxisKey, error } = useProcessedChartData(filteredData, normalizedRange, currentChart);

    return (
        <React.Fragment>
            <div className="card col-span-1 md:col-span-2 lg:col-span-5">
                <Chart />
            </div>

            <div>
                <TotalAmount data={chartData} xAxisKey={xAxisKey} error={error} />
            </div>
        </React.Fragment>
    );
};

export default Analysis;
