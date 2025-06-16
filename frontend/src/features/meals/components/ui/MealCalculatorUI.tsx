import { Plus, Calculator, Trash2 } from "lucide-react";
import Search from "../../../../components/ui/search/Search";
import MealCalculatorProps from "../MealCalculatorProps";
import { nutritionDatabase } from "../../services/TestMealApi";


const MealCalculatorUI = () => {
    const {
        showSearch,
        totalNutrition,
        filteredIngredients,
        addIngredient,
        removeIngredient,
        updateQuantity,
        ingredients,
        searchTerm
    } = MealCalculatorProps();

    return (
        <div className="h-[694px] overflow-auto rounded-lg">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    🥗 Nutrition Calculator
                </h1>

                {/* Add Ingredient Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Plus className="text-green-600" />
                        Tìm nguyên liệu
                    </h2>

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative flex-1">
                                <Search placeholder="Tìm nguyên liệu" />
                            </div>
                        </div>

                        {/* Search Results Dropdown */}
                        {showSearch && searchTerm && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                                {filteredIngredients.length > 0 ? (
                                    filteredIngredients.map(([key, item]) => (
                                        <button
                                            key={key}
                                            onClick={() =>
                                                addIngredient(key, item)
                                            }
                                            className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0">
                                            <div className="font-medium">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {item.nutrition.calories} cal /{" "}
                                                {item.per} {item.unit}
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-gray-500">
                                        Không tìm thấy nguyên liệu
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Quick Add Buttons */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                            Nguyên liệu phổ biến:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(nutritionDatabase)
                                .slice(0, 6)
                                .map(([key, item]) => (
                                    <button
                                        key={key}
                                        onClick={() => addIngredient(key, item)}
                                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
                                        + {item.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Ingredients List */}
                {ingredients.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Danh sách nguyên liệu
                        </h2>
                        <div className="space-y-3">
                            {ingredients.map((ing) => (
                                <div
                                    key={ing.id}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <span className="font-medium">
                                            {ing.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={ing.quantity}
                                            onChange={(e) =>
                                                updateQuantity(
                                                    ing.id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:border-green-500"
                                            min="0"
                                        />
                                        <span className="text-gray-600">
                                            {ing.unit}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeIngredient(ing.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Total Nutrition */}
                <div className="rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-500 to-green-600 text-slate-50">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Calculator size={20} />
                        Tổng giá trị
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="text-3xl font-bold">
                                {Math.round(totalNutrition.calories)}
                            </div>
                            <div className="text-sm opacity-90">Calories</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="text-3xl font-bold">
                                {totalNutrition.protein.toFixed(1)}g
                            </div>
                            <div className="text-sm opacity-90">Protein</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="text-3xl font-bold">
                                {totalNutrition.carbs.toFixed(1)}g
                            </div>
                            <div className="text-sm opacity-90">Carbs</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="text-3xl font-bold">
                                {totalNutrition.fat.toFixed(1)}g
                            </div>
                            <div className="text-sm opacity-90">Fat</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="text-3xl font-bold">
                                {totalNutrition.fiber.toFixed(1)}g
                            </div>
                            <div className="text-sm opacity-90">Fiber</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="text-3xl font-bold">
                                {totalNutrition.sugar.toFixed(1)}g
                            </div>
                            <div className="text-sm opacity-90">Sugar</div>
                        </div>
                    </div>

                    {/* Macro Percentages */}
                    {totalNutrition.calories > 0 && (
                        <div className="mt-6 space-y-2">
                            <h3 className="font-semibold mb-2">Tỷ lệ Macro:</h3>
                            <div className="flex gap-4 text-sm">
                                <span>
                                    Protein:{" "}
                                    {(
                                        ((totalNutrition.protein * 4) /
                                            totalNutrition.calories) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </span>
                                <span>
                                    Carbs:{" "}
                                    {(
                                        ((totalNutrition.carbs * 4) /
                                            totalNutrition.calories) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </span>
                                <span>
                                    Fat:{" "}
                                    {(
                                        ((totalNutrition.fat * 9) /
                                            totalNutrition.calories) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealCalculatorUI;