import React from "react";
import { ChevronDown } from "lucide-react";
import { useChart } from "../../../hooks/useChart";
import { cn } from "../../../../types/cn";
import { useToDo } from "../../../../hooks/useToDo";
import { formatImage } from "../../../utils/formatData";


const Member = () => {
    const { currentFilter } = useChart();
    const { memberList } = useToDo();
    console.log("Member: ", memberList);

    return (
        <React.Fragment>
            <div className="card col-span-1 md:col-span-2 lg:col-span-3 ">
                <div className="card-header justify-between px-2">
                    <p className="card-title text-base">thành viên</p>

                    <div className="flex justify-between items-center gap-x-2 text-slate-900 dark:text-slate-50">
                        <p>Sắp xếp theo: </p>

                        <button className="flex justify-between rounded-md text-sm">
                            {currentFilter?.label}
                            <ChevronDown size={20} />
                        </button>
                    </div>
                </div>

                <div className="card-body p-0 h-[344px] overflow-auto [scrollbar-width:thin]">
                    {memberList.map((items, index) => (
                        <div key={index} className={cn("flex items-center justify-between gap-x-4 py-2 pr-2", index < memberList.length - 1 && "border-b border-dashed border-slate-300 dark:border-slate-600")}>
                            <div className="flex items-center gap-x-4">
                                <img src={formatImage(items.image)} alt={items.user_name} className="size-10 flex-shrink rounded-full object-cover" />

                                <div className="flex flex-col gap-y-1">
                                    <p className="font-medium text-slate-900 dark:text-slate-50">{items.user_name}</p>
                                    <p className="text-[13px] font-medium text-slate-600 dark:text-slate-400">{items.user.email}</p>
                                </div>
                            </div>

                            <p className="font-medium text-slate-900 dark:text-slate-50">{items.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Member;