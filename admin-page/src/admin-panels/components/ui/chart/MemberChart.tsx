import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import React from "react";
import { useChart } from "../../../hooks/useChart";
import type { ProcessedChartProps } from "../../../../types/models.types";


const MemberChart: React.FC<ProcessedChartProps> = ({ data, error }) => {
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
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    opacity={.3} 
                    vertical={false}
                />

                <Tooltip cursor={false} 
                    content={({ payload, label }) => {
                        if (!payload || !payload.length) return null;
                        return (
                            <div className="bg-slate-800 text-white p-2 rounded-md text-sm shadow-md">
                                <p className="mb-1 font-semibold">{label}</p>
                                <p className="text-blue-400">{payload[0].value} thành viên</p>
                            </div>
                        );
                    }}
                />

                <XAxis
                    dataKey="label"
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    tickMargin={8}
                />

                <YAxis
                    dataKey="value"
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    tickMargin={6}
                />

                <Bar 
                    dataKey="value" 
                    fill={theme === "light" ? "#ADCAFA" : "#24457A"}
                    stroke="#3b82f6"
                    opacity={.8}
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MemberChart;