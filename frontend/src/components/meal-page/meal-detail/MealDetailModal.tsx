import React from "react";
import {
    X,
    Clock,
    Users,
    Flame,
    ChefHat,
    Heart,
    Share2,
    Printer,
    Edit,
    Trash2,
} from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { cn } from "@/utils/cn";
import Button from "@/components/common/button/ButtonCustom";
import MealFormModal from "../meal-add-item/MealFormModal";
import { useMealDetailLogic } from "./useMealDetailLogic";
import { useNavigate } from "react-router";


interface MealDetailModalProps {
    returnPath?: string;
    showBackground?: React.ReactNode;
}

const MealDetailModal: React.FC<MealDetailModalProps> = ({
    returnPath = '/meal-menu',
    showBackground,
}) => {
    const {
        meal,
        isLoading,
        error,
        isFav,
        handleFavoriteClick,
        handleShare,
        handlePrint,
        getDietBadgeColor,
        handleTagClick,
        canEdit,
        showEditModal,
        setShowEditModal,
        setShowDeleteConfirm,
        showDeleteConfirm,
        isDeleting,
        handleDelete,
    } = useMealDetailLogic();

    const navigate = useNavigate();

    // Custom close handler
    const handleClose = () => {
        navigate(returnPath);
    };

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md">
                    <p className="text-red-500 mb-4">
                        Không thể tải thông tin món ăn
                    </p>
                    <Button onClick={handleClose}>Đóng</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Show background if provided */}
            {showBackground}

            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-4 md:inset-8 lg:inset-24 bg-slate-50 rounded-xl shadow-2xl z-50 flex flex-col max-h-full max-w-1/2 m-auto overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 shadow-xs">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {meal?.meal_name || "Chi tiết món ăn"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-200 border border-slate-200 rounded-lg transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-96">
                            <LoadingSpinner />
                        </div>
                    ) : meal ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6">
                            {/* Left Column - Image & Basic Info */}
                            <div>
                                {/* Image */}
                                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100 mb-4">
                                    <img
                                        src={meal.image}
                                        alt={meal.meal_name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src =
                                                "https://via.placeholder.com/600x400/e5e7eb/9ca3af?text=" +
                                                encodeURIComponent(
                                                    meal.meal_name
                                                );
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <button
                                            onClick={handleFavoriteClick}
                                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-slate-200 transition-shadow">
                                            <Heart
                                                className={cn(
                                                    "h-5 w-5",
                                                    isFav
                                                        ? "fill-red-500 text-red-500"
                                                        : "text-gray-400"
                                                )}
                                            />
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-slate-200 transition-shadow">
                                            <Share2 className="h-5 w-5 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={handlePrint}
                                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-slate-200 transition-shadow">
                                            <Printer className="h-5 w-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 mb-4 text-lg font-medium">
                                    {meal.desc}
                                </p>

                                {/* Diet Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {meal.diet_type.map((diet, index) => (
                                        <span
                                            key={index}
                                            className={cn(
                                                "px-3 py-1.5 text-sm font-medium rounded-full",
                                                getDietBadgeColor(diet)
                                            )}>
                                            {diet}
                                        </span>
                                    ))}
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center p-3 bg-slate-100 rounded-lg">
                                        <Flame className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                                        <p className="text-2xl font-bold text-slate-900">
                                            {meal.calories}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            Calories
                                        </p>
                                    </div>
                                    {meal.recipe && (
                                        <>
                                            <div className="text-center p-3 bg-slate-100 rounded-lg">
                                                <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                                                <p className="text-2xl font-bold text-slate-900">
                                                    {meal.recipe.cook_time}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    Phút
                                                </p>
                                            </div>
                                            <div className="text-center p-3 bg-slate-100 rounded-lg">
                                                <Users className="h-6 w-6 text-green-500 mx-auto mb-1" />
                                                <p className="text-2xl font-bold text-slate-900">
                                                    {meal.recipe.serve}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    Người
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Nutrition Info */}
                                {meal.nutrition && (
                                    <div className="bg-teal-100/70 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <ChefHat className="h-5 w-5" />
                                            Thông tin dinh dưỡng
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Protein:
                                                </span>
                                                <span className="font-medium">
                                                    {meal.nutrition.protein}g
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Carbs:
                                                </span>
                                                <span className="font-medium">
                                                    {meal.nutrition.carbs}g
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Fat:
                                                </span>
                                                <span className="font-medium">
                                                    {meal.nutrition.fat}g
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Fiber:
                                                </span>
                                                <span className="font-medium">
                                                    {meal.nutrition.fiber}g
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Sugar:
                                                </span>
                                                <span className="font-medium">
                                                    {meal.nutrition.sugar}g
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Sodium:
                                                </span>
                                                <span className="font-medium">
                                                    {meal.nutrition.sodium}mg
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Recipe & Instructions */}
                            <div>
                                {meal.recipe && (
                                    <>
                                        {/* Recipe Info */}
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Thông tin công thức
                                            </h3>

                                            {/* Recipe Stats */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        Thời gian nấu:{" "}
                                                        <span className="font-medium">
                                                            {
                                                                meal.recipe
                                                                    .cook_time
                                                            }{" "}
                                                            phút
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        Khẩu phần:{" "}
                                                        <span className="font-medium">
                                                            {meal.recipe.serve}{" "}
                                                            người
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Recipe Details */}
                                            <div className="space-y-2 text-gray-600">
                                                <p>
                                                    <span className="font-medium">
                                                        Loại ẩm thực:
                                                    </span>{" "}
                                                    {meal.recipe.cuisine_type}
                                                </p>
                                                <p>
                                                    <span className="font-medium">
                                                        Người tạo:
                                                    </span>{" "}
                                                    {meal.recipe.created_by}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Ingredients */}
                                        {meal.ingredients &&
                                            meal.ingredients.length > 0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                        Nguyên liệu
                                                    </h3>
                                                    <ul className="space-y-2 bg-slate-100 px-2 py-4 grid grid-cols-2">
                                                        {meal.ingredients.map(
                                                            (ing, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-start">
                                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                                    <span className="text-gray-700">
                                                                        {
                                                                            ing.ingredient_name
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            ing.quantity
                                                                        }{" "}
                                                                        {
                                                                            ing.unit
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                        {/* Instructions */}
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                Hướng dẫn chế biến
                                            </h3>
                                            <div className="space-y-3 bg-slate-100 px-2 py-4 rounded-md max-h-84 overflow-y-auto [scrollbar-width:thin]">
                                                {meal.recipe.desc_step
                                                    .split("\n")
                                                    .map((step, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-2">
                                                            <span className="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full text-sm font-medium flex-shrink-0 mt-1">
                                                                {index + 1}
                                                            </span>
                                                            <p className="text-gray-700">
                                                                {step.replace(
                                                                    /^\d+\.\s*/,
                                                                    ""
                                                                )}
                                                            </p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Tags */}
                                {meal.tags && meal.tags.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {meal.tags.map((tag) => (
                                                <Button
                                                    key={tag.tag_id}
                                                    onClick={() =>
                                                        handleTagClick(
                                                            tag.tag_name
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-slate-200 transition-colors">
                                                    #{tag.tag_name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-96">
                            <p className="text-gray-500">Không có dữ liệu</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200  p-4 md:p-6 bg-slate-50">
                    <div className="flex justify-end items-center gap-3">
                        {/* Edit & Delete buttons for authorized users */}
                        {canEdit && (
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={() => setShowEditModal(true)}
                                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
                                    title="Chỉnh sửa">
                                    <Edit className="h-5 w-5 text-blue-600" />
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
                                    title="Xóa">
                                    <Trash2 className="h-5 w-5 text-red-600" />
                                    Xóa
                                </Button>
                            </div>
                        )}

                        <Button
                            onClick={handleClose}
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors">
                            Đóng
                        </Button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {meal && (
                <MealFormModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    meal={meal}
                    mode="edit"
                />
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-lg font-semibold mb-4">
                                Xác nhận xóa món ăn
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Bạn có chắc chắn muốn xóa món "{meal?.meal_name}
                                "? Hành động này không thể hoàn tác.
                            </p>
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    disabled={isDeleting}>
                                    Hủy
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-600 hover:bg-red-700">
                                    {isDeleting ? (
                                        <>
                                            <LoadingSpinner className="h-4 w-4 mr-2" />
                                            Đang xóa...
                                        </>
                                    ) : (
                                        "Xóa món ăn"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default MealDetailModal;
