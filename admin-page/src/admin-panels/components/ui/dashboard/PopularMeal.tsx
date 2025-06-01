import React from "react";
import { PencilLine, Star, Trash } from "lucide-react";
import { PopularMealData } from "../../data/meals/PopularMealData";
import { cn } from "../../../../types/cn";


const PopularMeal = () => {
    const tableHeader = [
        "#", "Tên món", "Giá", "Danh mục", "Nguyên liệu", "Người đóng góp", "Đánh giá", "Tùy chọn"
    ]

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-header px-4">
                    <p className="card-title text-base">thực đơn phổ biến</p>
                </div>

                <div className="card-body">
                    <div className="relative h-[400px] w-full flex flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    {tableHeader.map((item, index) => (
                                        <th key={index} className="table-header-item">{item}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="table-body">
                                {PopularMealData.map((items, index) => (
                                    <tr key={items.id} className={cn("table-row", index < PopularMealData.length - 1 && "border-b border-dashed border-slate-300 dark:border-slate-600")}>
                                        <td className="table-body-item">{items.id}</td>
                                        <td className="table-body-item">
                                            <div className="flex w-max gap-x-4">
                                                <img src={items.image} alt={items.name} className="size-14 rounded-lg object-cover" />
                                                <div className="flex flex-col">
                                                    <p>{items.name}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{items.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-body-item">{items.price}</td>
                                        <td className="table-body-item">{items.category}</td>
                                        <td className="table-body-item">{items.brand}</td>
                                        <td className="table-body-item">{items.stock}</td>
                                        <td className="table-body-item">
                                            <div className="flex items-center gap-x-2">
                                                <Star size={18} className=" fill-yellow-600 stroke-yellow-600" />
                                                {items.rating}
                                            </div>
                                        </td>
                                        <td className="table-body-item">
                                            <div className="flex items-center gap-x-4">
                                                <button className="text-blue-500 dark:text-blue-600">
                                                    <PencilLine size={18} />
                                                </button>
                                                <button className="text-red-500">
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PopularMeal;
