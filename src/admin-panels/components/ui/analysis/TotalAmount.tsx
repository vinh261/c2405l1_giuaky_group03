import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import type { ProcessedChartProps } from "../../../../types/models.types";

const TotalAmount: React.FC<ProcessedChartProps> = ({ data }) => {

    return (
        <React.Fragment>
            <ResponsiveContainer width="100%">
                <PieChart width={730} height={250}>
                    <Pie 
                        data={data} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={50} 
                        fill="#8884d8" 
                    />

                    <Pie 
                        data={data} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={80}
                        fill="#82ca9d" 
                        label 
                    />
                </PieChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default TotalAmount;
