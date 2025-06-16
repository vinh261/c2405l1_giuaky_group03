import type { MealFormModalProps } from "@/types/meals.types";
import { useMealFormLogic } from "./useMealFormLogic";
import { ChefHat, Plus, Save, Trash2, X } from "lucide-react";
import { Controller } from "react-hook-form";
import Button from "@/components/common/button/ButtonCustom";
import { LoadingSpinner } from "@/components/common/loading";


const MealFormModal = ({ isOpen, onClose, meal, mode }: MealFormModalProps) => {
    const { 
        categories,
        dietTypes,
        register,
        control,
        handleSubmit,
        errors,
        isSubmitting,
        ingredients,
        addIngredient,
        removeIngredient,
        onSubmit,
    } = useMealFormLogic({ isOpen, onClose, meal, mode });

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-4 md:inset-8 lg:inset-24 bg-slate-50 rounded-xl shadow-2xl z-50 flex flex-col max-h-full max-w-1/2 m-auto overflow-auto [scrollbar-width:thin]">
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 shadow-xs">
                    <div className="w-full bg-white rounded-xl shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <ChefHat className="h-6 w-6" />
                                {mode === "create"
                                    ? "Tạo món ăn mới"
                                    : "Chỉnh sửa món ăn"}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    {/* Basic Info */}
                                    <div>
                                        <label htmlFor="meal_name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Tên món ăn{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            {...register("meal_name")}
                                            id="meal_name"
                                            name="meal_name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="VD: Phở bò Hà Nội"
                                        />
                                        {errors.meal_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.meal_name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            {...register("desc")}
                                            id="desc"
                                            name="desc"
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="Mô tả ngắn về món ăn..."
                                        />
                                        {errors.desc && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.desc.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                            URL hình ảnh
                                        </label>
                                        <input
                                            {...register("image")}
                                            id="image"
                                            name="image"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="https://..."
                                        />
                                        {errors.image && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.image.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                            Danh mục{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            {...register("category")}
                                            id="category"
                                            name="category"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer">
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat.value}
                                                    value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <span className="block text-sm font-medium text-gray-700 mb-1">
                                            Chế độ ăn{" "}
                                            <p className="text-red-500">
                                                *
                                            </p>
                                        </span>
                                        <Controller
                                            control={control}
                                            name="diet_type"
                                            render={({ field }) => (
                                                <div className="space-y-2">
                                                    {dietTypes.map((diet) => (
                                                        <label
                                                            key={diet.value}
                                                            htmlFor="checkbox"
                                                            className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                id="checkbox"
                                                                value={
                                                                    diet.value
                                                                }
                                                                checked={field.value.includes(
                                                                    diet.value
                                                                )}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        field.onChange(
                                                                            [
                                                                                ...field.value,
                                                                                diet.value,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        field.onChange(
                                                                            field.value.filter(
                                                                                (
                                                                                    v
                                                                                ) =>
                                                                                    v !==
                                                                                    diet.value
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                                className="mr-2"
                                                            />
                                                            {diet.label}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                        {errors.diet_type && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.diet_type.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    {/* Recipe Info */}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-semibold mb-3">
                                            Thông tin công thức
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label htmlFor="cuisine_type" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Loại ẩm thực{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    {...register(
                                                        "recipe.cuisine_type"
                                                    )}
                                                    id="cuisine_type"
                                                    name="recipe.cuisine_type"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    placeholder="VD: Vietnamese, Asian..."
                                                />
                                                {errors.recipe
                                                    ?.cuisine_type && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors.recipe
                                                                .cuisine_type
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label htmlFor="cook_time" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Thời gian nấu (phút){" "}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="cook_time"
                                                        {...register(
                                                            "recipe.cook_time",
                                                            {
                                                                valueAsNumber:
                                                                    true,
                                                            }
                                                        )}
                                                        type="number"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                    {errors.recipe
                                                        ?.cook_time && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errors.recipe
                                                                    .cook_time
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="serve" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Khẩu phần{" "}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="serve"
                                                        {...register(
                                                            "recipe.serve",
                                                            {
                                                                valueAsNumber:
                                                                    true,
                                                            }
                                                        )}
                                                        type="number"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                    {errors.recipe?.serve && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errors.recipe
                                                                    .serve
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="desc_step)" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Hướng dẫn chế biến{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea
                                                    id="desc_step"
                                                    {...register(
                                                        "recipe.desc_step"
                                                    )}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg [scrollbar-width:thin]"
                                                    placeholder="1. Chuẩn bị nguyên liệu&#10;2. Sơ chế..."
                                                />
                                                {errors.recipe?.desc_step && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors.recipe
                                                                .desc_step
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nutrition Info */}
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-semibold mb-3">
                                            Thông tin dinh dưỡng
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="calo" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Calories{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    id="calo"
                                                    {...register(
                                                        "nutrition.calories",
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                                {errors.nutrition?.calories && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors.nutrition
                                                                .calories
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Protein (g)
                                                </label>
                                                <input
                                                    id="protein"
                                                    {...register(
                                                        "nutrition.protein",
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="carb" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Carbs (g)
                                                </label>
                                                <input
                                                    {...register(
                                                        "nutrition.carbohydrate",
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    id="carb"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Fat (g)
                                                </label>
                                                <input
                                                    {...register(
                                                        "nutrition.fat",
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    id="fat"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="fiber" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Fiber (g)
                                                </label>
                                                <input
                                                    {...register(
                                                        "nutrition.fiber",
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    id="fiber"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="sugar" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Sugar (g)
                                                </label>
                                                <input
                                                    id="sugar"
                                                    {...register(
                                                        "nutrition.sugar",
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="sodium" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Sodium (g)
                                                </label>
                                                <input
                                                    {...register(
                                                        "nutrition.sodium",
                                                        { valueAsNumber: true }
                                                    )}
                                                    id="sodium"
                                                    type="number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ingredients Section */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">
                                        Nguyên liệu{" "}
                                        <span className="text-red-500">*</span>
                                    </h3>
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={addIngredient}
                                        className="border border-slate-300 hover:bg-slate-200 transition-colors"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Thêm nguyên liệu
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {ingredients.map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 items-start">
                                            <input
                                                {...register(
                                                    `ingredients.${index}.ingredient_name`
                                                )}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Tên nguyên liệu"
                                            />
                                            <input
                                                {...register(
                                                    `ingredients.${index}.quantity`,
                                                    { valueAsNumber: true }
                                                )}
                                                type="number"
                                                step="0.1"
                                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Số lượng"
                                            />
                                            <input
                                                {...register(
                                                    `ingredients.${index}.units`
                                                )}
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Đơn vị"
                                            />
                                            {ingredients.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeIngredient(index)
                                                    }
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.ingredients && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.ingredients.message}
                                    </p>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                                <Button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="border border-slate-300 hover:bg-slate-200 transition-colors"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    className="border border-slate-300 hover:bg-sky-300"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSpinner className="h-4 w-4 mr-2" />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            {mode === "create"
                                                ? "Tạo món ăn"
                                                : "Cập nhật"}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MealFormModal;
