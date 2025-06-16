import React from "react";
import { Search, Trash2, Calculator, Apple } from "lucide-react";
import { cn } from "@/utils/cn";
import { useNutritionLogic } from "./useNutritionLogic";
import Button from "@/components/common/button/ButtonCustom";
import type { NutrientRowProps } from "@/types/nutrition.types";


const NutritionCalculator: React.FC = () => {
    const {
        ref,
        searchTerm,
        setSearchTerm,
        selectedIngredients,
        filteredIngredients,
        showDropdown,
        totals,
        handleAddIngredient,
        handleRemoveIngredient,
        handleQuantityChange,
        handleClearAll
    }= useNutritionLogic();

    return (
        <div className=" bg-slate-100 p-4 sm:px-6 lg:px-8 max-h-200 overflow-auto [scrollbar-width:thin]">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Calculator className="h-8 w-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Tính toán giá trị dinh dưỡng
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Sử dụng công cụ này để tính toán giá trị dinh dưỡng
                        của bữa ăn bằng cách thêm các nguyên liệu và điều chỉnh
                        số lượng.
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Tìm kiếm và thêm nguyên liệu
                    </h2>

                    <div className="relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm nguyên liệu..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-transparent"
                            />
                        </div>

                        {/* Dropdown */}
                        {showDropdown && filteredIngredients.length > 0 && (
                            <div ref={ref} className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto [scrollbar-width:thin]">
                                {filteredIngredients.map((ingredient) => (
                                    <button
                                        key={ingredient.id}
                                        onClick={() =>
                                            handleAddIngredient(ingredient)
                                        }
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                                        <div className="font-medium text-gray-900">
                                            {ingredient.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {ingredient.calories} cal per{" "}
                                            {ingredient.serving_size}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Ingredients */}
                {selectedIngredients.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Nguyên liệu đã chọn ({selectedIngredients.length})
                            </h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearAll}
                                className="text-red-600 hover:text-red-700"
                            >
                                Xóa tất cả
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {selectedIngredients.map((ingredient) => (
                                <div
                                    key={ingredient.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {ingredient.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {ingredient.calories} cal per{" "}
                                            {ingredient.serving_size}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-2">
                                            <label className="text-sm text-gray-600">
                                                Số lượng:
                                            </label>
                                            <input
                                                type="number"
                                                value={ingredient.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        ingredient.id,
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                                                min="1"
                                            />
                                            <span className="text-sm text-gray-600">
                                                grams
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleRemoveIngredient(
                                                    ingredient.id
                                                )
                                            }
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Nutrition Totals */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <Apple className="h-6 w-6 text-green-600" />
                        <h2 className="text-xl font-semibold">
                            Tổng giá trị dinh dưỡng
                        </h2>
                    </div>

                    {selectedIngredients.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                Không có nguyên liệu nào được chọn. Vui lòng
                                thêm nguyên liệu để tính toán giá trị dinh
                                dưỡng.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Main Macros */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700 mb-3">
                                    Giá trị dinh dưỡng chính
                                </h3>

                                <NutrientRow
                                    label="Calories"
                                    value={totals.calories}
                                    unit="kcal"
                                    dailyValue={2000}
                                    isCalories
                                />
                                <NutrientRow
                                    label="Protein"
                                    value={totals.protein}
                                    unit="g"
                                    dailyValue={50}
                                />
                                <NutrientRow
                                    label="Carbohydrates"
                                    value={totals.carbs}
                                    unit="g"
                                    dailyValue={300}
                                />
                                <NutrientRow
                                    label="Fat"
                                    value={totals.fat}
                                    unit="g"
                                    dailyValue={65}
                                />
                            </div>

                            {/* Additional Nutrients */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700 mb-3">
                                    Các chất dinh dưỡng bổ sung
                                </h3>

                                <NutrientRow
                                    label="Fiber"
                                    value={totals.fiber}
                                    unit="g"
                                    dailyValue={25}
                                />
                                <NutrientRow
                                    label="Sugar"
                                    value={totals.sugar}
                                    unit="g"
                                    dailyValue={50}
                                />
                                <NutrientRow
                                    label="Sodium"
                                    value={totals.sodium}
                                    unit="mg"
                                    dailyValue={2300}
                                />
                            </div>
                        </div>
                    )}

                    {/* Daily Value Note */}
                    {selectedIngredients.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-center">
                                * Giá trị phần trăm hàng ngày được tính dựa trên chế độ ăn 2.000 calories. Giá trị hàng ngày của bạn có thể cao hơn hoặc thấp hơn tùy thuộc vào nhu cầu dinh dưỡng cá nhân.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const NutrientRow: React.FC<NutrientRowProps> = ({
    label,
    value,
    unit,
    dailyValue,
    isCalories = false,
}) => {
    const percentage = Math.round((value / dailyValue) * 100);

    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="flex justify-between items-baseline">
                    <span
                        className={cn(
                            "font-medium",
                            isCalories ? "text-lg" : "text-base"
                        )}>
                        {label}
                    </span>
                    <span
                        className={cn(
                            "font-semibold",
                            isCalories
                                ? "text-xl text-green-600"
                                : "text-base text-gray-900"
                        )}>
                        {value.toFixed(1)} {unit}
                    </span>
                </div>

                <div className="mt-1">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    percentage > 100
                                        ? "bg-red-500"
                                        : percentage > 75
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                )}
                                style={{
                                    width: `${Math.min(percentage, 100)}%`,
                                }}
                            />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                            {percentage}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NutritionCalculator;