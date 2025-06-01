import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import React from "react";
import { useChart } from "../../../hooks/useChart";
import { CustomTooltip } from "../../custom/CustomTooltip";
import type { ProcessedChartProps } from "../../../../types/models.types";


const VisitedChart: React.FC<ProcessedChartProps> = ({ data, error }) => {
    const { theme } = useChart();
    
    if (error) {
        return (
            <div className="flex items-center justify-center h-[320px] bg-white dark:bg-[#2D2D2D] rounded-lg shadow">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    opacity={.3} 
                    vertical={false}
                />

                <Tooltip cursor={false} 
                    content={<CustomTooltip />}
                />

                <XAxis
                    dataKey="label"
                    // strokeWidth={0}
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    tickMargin={8}
                    
                />

                <YAxis
                    dataKey="value"
                    // strokeWidth={0}
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    tickMargin={6}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="url(#colorVisit)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default VisitedChart;