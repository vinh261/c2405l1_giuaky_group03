import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { BreakfastItem } from "../components/data/meals/BreakfastItem";
import { LunchItem } from "../components/data/meals/LunchItem";
import { DinnerItem } from "../components/data/meals/DinnerItem";
import { cn } from "../../types/cn";


const RecipePage = () => {
    const allMeal = [ ...BreakfastItem, ...LunchItem, ...DinnerItem ];
    const [ selected, setSelected ] = useState(allMeal[0]);

    return (
        <React.Fragment>
            <div className="grid grid-rows-auto gap-y-12">
                {/* HEAD */}
                <div className="flex justify-between">
                    <p className="title">Công thức</p>

                    <div className="flex">
                        <div className="input h-9! mr-3">
                            <Search size={20} className="text-slate-400" />
                            <input
                                id="search"
                                name="search"
                                type="text"
                                placeholder="Tìm công thức..."
                                className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-400 text-sm placeholder:text-sm dark:text-slate-50"
                            />
                        </div>

                        <button className="flex gap-x-1 items-center justify-between px-3 rounded-lg text-slate-50 bg-cyan-700 hover:bg-cyan-600 dark:text-late-600 dark:bg-cyan-800 dark:hover:bg-cyan-700">
                            <Plus size={18} />
                            Thêm công thức
                        </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="grid grid-cols-[290px_1fr] h-200 gap-x-4">
                    {/* LEFT */}
                    <div className="flex flex-col overflow-auto w-fit [scrollbar-width:thin] rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 bg-white transition-colors dark:text-slate-50 dark:bg-(--item-bg-dark)">
                        {allMeal.map((item, index) => (
                            <div key={index} className={cn("p-6 w-70 border-slate-300 dark:border-slate-700", index < allMeal.length - 1 && "border-b border-dashed")}>
                                {/* CONTENT BOX */}
                                <div className="content-box grid grid-rows-auto gap-4">
                                    <p className="content-title font-bold text-xl">
                                        {item.label}
                                    </p>

                                    <button className={cn("border rounded-xl font-semibold w-fit px-4 py-1 hover:text-slate-50 hover:bg-sky-500 hover:border-sky-500 transition-colors dark:hover:bg-sky-800 dark:hover:border-sky-800")}
                                    onClick={() => setSelected(item)}>
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT */}
                    {selected.recipe.map((item, index) => (
                        <div key={index} className="border grid grid-rows-[440px_1fr] rounded-lg border-slate-300 dark:border-slate-700">
                            <div className="grid grid-cols-2">
                                {/* CONG THUC */}
                                <ul className="p-4 grid grid-rows-auto">
                                    {item.recipeDetail.map((detail, indexDetail) => (
                                        <li key={indexDetail} className="text-xl">
                                            {detail}
                                        </li>
                                    ))}
                                </ul>

                                {/* IMG */}
                                <div className="">
                                    <img src={item.images} alt="" className="object-cover w-full h-full" />
                                </div>
                            </div>

                            {/* DESC */}
                            <div className="">
                                asdasdasda
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
};

export default RecipePage;
