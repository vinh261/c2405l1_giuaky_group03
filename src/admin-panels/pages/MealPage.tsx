import React from "react";
import { BreakfastItem } from "../components/data/meals/BreakfastItem";
import { LunchItem } from "../components/data/meals/LunchItem";
import { DinnerItem } from "../components/data/meals/DinnerItem";
import SingleCalendar from "../components/custom/SingleCalendar";
import { cn } from "../../types/cn";


const MealType = [
    {title: "Sáng", data: BreakfastItem },
    {title: "Trưa", data: LunchItem },
    {title: "Tối", data: DinnerItem }
]

const MealPage = () => {
    return (
        <React.Fragment>
            {/* LEFT CONTENT */}
            <div className="grid grid-rows-auto gap-4">
                {MealType.map((items, index) => (
                    <div key={index} className="flex text-slate-900 dark:text-slate-50 pt-10 max-h-70">
                        {/* MEAL TYPE */}
                        <div className={cn("content-center transition-colors rounded-tl-4xl rounded-bl-4xl w-10 border border-slate-300 dark:border-slate-700", 
                            items.title === "Sáng" && "bg-sky-200/70 dark:bg-cyan-950/70",
                            items.title === "Trưa" && "bg-orange-200/70 dark:bg-yellow-950/70",
                            items.title === "Tối" && "bg-indigo-200/70 dark:bg-blue-950/70",
                         )}>
                            <p className="-rotate-90 text-xl">{items.title}</p>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {items.data.map((item, index) => (
                                // BOX:
                                <div key={index} className="border p-6 ml-2 w-70 rounded-xl shrink-0 bg-white transition-colors dark:bg-(--item-bg-dark) border-slate-300 dark:border-slate-700">
                                    {/* HEAD BOX */}
                                    <div className="h-fit relative -top-15 grid grid-cols-2 gap-4">
                                        <img src={item.img} alt="Black Coffee" className="rounded-full object-cover w-20 h-20 border outline-[#898A87] border-slate-500" />
                                        <p className="text-end place-content-end text-base font-bold text-slate-600 dark:text-slate-400">{item.price}</p>
                                    </div>

                                    {/* CONTENT BOX */}
                                    <div className="content-box grid grid-rows-auto gap-4 -mt-10">
                                        <p className="content-title font-bold text-xl">
                                            {item.label}
                                        </p>

                                        <p className="content-desc max-h-15 overflow-auto [scrollbar-width:thin] text-slate-500">
                                            {item.desc}
                                        </p>

                                        <button className={cn("btn-detail border rounded-xl font-semibold w-fit px-4 py-1 hover:text-slate-50 hover:bg-sky-500 hover:border-sky-500 transition-colors dark:hover:bg-sky-800 dark:hover:border-sky-800",
                                            items.data === BreakfastItem && "text-teal-700 border-sky-500/80 dark:border-sky-700/80",
                                            items.data === LunchItem && "text-amber-700 border-orange-700/80 dark:border-yellow-800/80 dark:text-orange-800 dark:hover:text-slate-50",
                                            items.data === DinnerItem && "text-indigo-700 border-blue-700/80 dark:text-violet-400/70 dark:hover:text-slate-50 dark:border-purple-900/80"
                                        )}>
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT ASIDE */}
            <div className="w-fit grid fixed top-16 right-1">
                <SingleCalendar />

                <div className="border rounded-lg h-screen">

                </div>
            </div>
        </React.Fragment>
    )
};

export default MealPage;
