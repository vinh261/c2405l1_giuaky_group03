import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import type { Meal, MealCategory } from "@/types/meals.types";
import { getMeals } from "@/services/api/publicMeals.service";
import Button from "@/components/common/button/ButtonCustom";
import { cn } from "@/utils/cn";
import { formatMealImage } from "@/utils/helpers/format.helper";

type MealSelectorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (meal: Meal) => void;
    selectedMealTime: string;
};

const categories: { value: MealCategory | "all"; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "breakfast", label: "Bữa sáng" },
    { value: "lunch", label: "Bữa trưa" },
    { value: "dinner", label: "Bữa tối" },
    { value: "snacks", label: "Ăn vặt" },
    { value: "smoothies", label: "Smoothies" },
];

const MealSelectorModal: React.FC<MealSelectorModalProps> = ({
    isOpen,
    onClose,
    onSelect,
    selectedMealTime,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<
        MealCategory | "all"
    >("all");

    // Fetch meals
    const { data, isLoading } = useQuery({
        queryKey: ["meals", selectedCategory, searchTerm],
        queryFn: () =>
            getMeals({
                category:
                    selectedCategory === "all" ? undefined : selectedCategory,
                search: searchTerm || undefined,
                per_page: 20,
            }),
        enabled: isOpen,
    });

    const meals = data?.data || [];

    const mealTimeLabel =
        {
            breakfast: "Bữa sáng",
            lunch: "Bữa trưa",
            dinner: "Bữa tối",
            snack: "Ăn vặt",
        }[selectedMealTime] || "";

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Chọn món cho {mealTimeLabel}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Search & Filters */}
                        <div className="p-6 border-b">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Tìm kiếm món ăn..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="flex gap-2 flex-wrap">
                                    {categories.map((cat) => (
                                        <Button
                                            key={cat.value}
                                            className={cn(
                                                "",
                                                selectedCategory === cat.value
                                                    ? "primary"
                                                    : "outline"
                                            )}
                                            size="sm"
                                            onClick={() =>
                                                setSelectedCategory(cat.value)
                                            }>
                                            {cat.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Meals Grid */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner />
                                </div>
                            ) : meals.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">
                                        Không tìm thấy món ăn nào
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {meals.map((meal) => (
                                        <button
                                            key={meal.meal_id}
                                            onClick={() => onSelect(meal)}
                                            className="text-left p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all">
                                            <img
                                                src={formatMealImage(meal.image)}
                                                alt={meal.meal_name}
                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                                onError={(e) => {e.currentTarget.src = "@/assets/images/menu/no-image.jpg"}}
                                            />
                                            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                                                {meal.meal_name}
                                            </h4>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-orange-600 font-medium">
                                                    {meal.calories} cal
                                                </span>
                                                <span className="text-gray-500">
                                                    {meal.recipe?.cook_time ||
                                                        30}{" "}
                                                    phút
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t bg-gray-50">
                            <div className="flex justify-end">
                                <Button variant="outline" onClick={onClose}>
                                    Đóng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MealSelectorModal;
