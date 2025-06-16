import type React from "react";
import type { MealItemPlanner } from "../../types/meals.types";
import { useState } from "react";
import { Clock, MoreVertical } from "lucide-react";


const MealCard: React.FC<{ meal: MealItemPlanner }> = ({ meal }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
                <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-sm font-medium">
                        {meal.mealType.charAt(0).toUpperCase() +
                            meal.mealType.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
                    {meal.name}
                </h3>

                <div className="flex items-center justify-between">
                    {/* Cooking Time */}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock size={16} />
                        <span>{meal.cookingTime} phút</span>
                    </div>

                    {/* Actions */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical size={20} className="text-gray-500" />
                        </button>

                        {/* Dropdown Menu */}
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-1 bg-slate-50 rounded-lg shadow-lg border border-slate-300 py-1 min-w-[150px]">
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-200">
                                        Xem chi tiết
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-200">
                                        Chỉnh sửa
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-200">
                                        Di chuyển
                                    </button>
                                    <hr className="my-1 border-slate-300 w-[90%] place-self-center" />
                                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-200">
                                        Xóa
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MealCard;