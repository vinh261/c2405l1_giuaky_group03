import React from "react";
import CardItem from "../../data/dashboard/CardItem";


const CardStatistic = () => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {CardItem.map((items, index) => (
                    <div key={index} className="card">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                                {items.icon}
                            </div>
                            <p className="card-title text-base">{items.title}</p>
                        </div>

                        <div className="card-body bg-slate-100 transition-colors dark:bg-(--item-content-bg-dark)">
                            <p className="text-2xl font-bold text-slate-900 transition-colors dark:text-slate-50">{items.value}</p>
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 text-[13px] dark:text-blue-600 dark:border-blue-600">
                                {items.trend}
                                {items.percent}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default CardStatistic;
