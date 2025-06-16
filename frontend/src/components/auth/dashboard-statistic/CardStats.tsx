import React from "react";
import { useCardStats } from "./useCardStats";
import { LoadingSpinner } from "@/components/common/loading";
import { cn } from "@/utils/cn";
import { TrendingDown, TrendingUp } from "lucide-react";


const CardStatistic = () => {
    const result = useCardStats();
    
    // Type guard to ensure we have the expected object structure
    if (!result || typeof result !== 'object' || 'type' in result) {
        return (
            <div className="flex justify-center items-center h-96">
                <LoadingSpinner />
            </div>
        );
    }
    
    const { statCards } = result;

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {statCards.map((items, index) => (
                    <div key={index} className="card">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                                {items.icon}
                            </div>
                            <p className="card-title text-base">{items.title}</p>

                            {items.change !== 0 && (
                                <div
                                    className={cn("flex items-center text-sm font-medium",
                                        items.change > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    )}
                                >
                                    {items.change > 0 ? (
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 mr-1" />
                                    )}
                                    {Math.abs(items.change)}%
                                </div>
                            )}
                        </div>

                        <div className="card-body bg-slate-100 transition-colors dark:bg-[#0d1117]">
                            <span className="flex w-fit items-center gap-x-2 rounded-full px-2 py-1 font-medium text-sm transition-colors dark:text-slate-300">
                                <h3 className="text-2xl font-bold">
                                    {items.value}
                                </h3>
                                <p className="text-base text-slate-700 dark:text-slate-400 mt-1">
                                    {items.subtitle}
                                </p>
                            </span>
                            <p className="text-slate-600 font-medium dark:text-slate-500">
                                {items.subtext}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};
export default CardStatistic;