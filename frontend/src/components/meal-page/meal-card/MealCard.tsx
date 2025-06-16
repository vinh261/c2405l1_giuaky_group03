import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Flame } from "lucide-react";
import { useMealStore } from "@/stores/mealStore";
import { cn } from "@/utils/cn";
import type { MealCardProps } from "@/types/meals.types";
import toast from "react-hot-toast";
import Button from "@/components/common/button/ButtonCustom";
import { formatMealImage } from "@/utils/helpers/format.helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, removeFavorite } from "@/services/api/protectedMeal.service";


const MealCard: React.FC<MealCardProps> = ({ meal, viewMode = "grid" }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isFavorite, addFavorite: addLocalFavorite, removeFavorite: removeLocalFavorite } = useMealStore();

    const isFav = isFavorite(meal.meal_id);

    // Add favorite mutation
    const addFavoriteMutation = useMutation({
        mutationFn: () => addFavorite(meal.meal_id),
        onSuccess: () => {
            addLocalFavorite(meal.meal_id);
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success("Đã thêm vào danh sách yêu thích");
        },
        onError: () => {
            toast.error("Không thể thêm vào danh sách yêu thích");
        }
    });

    // Remove favorite mutation
    const removeFavoriteMutation = useMutation({
        mutationFn: () => removeFavorite(meal.meal_id),
        onSuccess: () => {
            removeLocalFavorite(meal.meal_id);
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success("Đã xóa khỏi danh sách yêu thích");
        },
        onError: () => {
            toast.error("Không thể xóa khỏi danh sách yêu thích");
        }
    });

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isFav) {
            removeFavoriteMutation.mutate();
        } else {
            addFavoriteMutation.mutate();
        }
    };

    const handleViewDetail = () => {
        // Navigate to appropriate route based on current location
        if (location.pathname.includes('/admin')) {
            navigate(`/admin/meals/${meal.meal_id}`);
        } else if (location.pathname.includes('/favorites')) {
            navigate(`/favorites/${meal.meal_id}`);
        } else {
            navigate(`/meal-menu/${meal.meal_id}`);
        }
    };

    const getDietBadgeColor = (diet: string) => {
        const colors: Record<string, string> = {
            Vegan: "bg-green-100 text-green-800",
            Vegetarian: "bg-emerald-100 text-emerald-800",
            Keto: "bg-purple-100 text-purple-800",
            Paleo: "bg-orange-100 text-orange-800",
            "Gluten-Free": "bg-blue-100 text-blue-800",
            "Low Carb": "bg-yellow-100 text-yellow-800",
            "High Protein": "bg-red-100 text-red-800",
        };
        return colors[diet] || "bg-gray-100 text-gray-800";
    };

    if (viewMode === "list") {
        return (
            <div
                className="bg-slate-50 rounded-lg shadow-md hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer"
                onClick={handleViewDetail}>
                <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                        <img
                            src={formatMealImage(meal.image)}
                            alt={meal.meal_name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                                e.currentTarget.src = '/src/assets/images/menu/no-image.jpg';
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {meal.meal_name}
                            </h3>
                            <button
                                onClick={handleFavoriteClick}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <Heart
                                    className={cn(
                                        "w-5 h-5",
                                        isFav
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-400"
                                    )}
                                />
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {meal.desc}
                        </p>

                        <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Flame className="w-4 h-4" />
                                <span>{meal.calories} cal</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {meal.diet_type.map((diet, index) => (
                                <span
                                    key={index}
                                    className={cn(
                                        "px-2 py-1 text-xs font-medium rounded-full",
                                        getDietBadgeColor(diet)
                                    )}>
                                    {diet}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view (default)
    return (
        <div
            className="bg-slate-50 rounded-lg shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 overflow-hidden cursor-pointer group"
            onClick={handleViewDetail}>
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                    src={formatMealImage(meal.image)}
                    alt={meal.meal_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.currentTarget.src = '/src/assets/images/menu/no-image.jpg';
                    }}
                />

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart
                        className={cn(
                            "w-5 h-5",
                            isFav
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                        )}
                    />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 bg-black bg-opacity-60 text-white text-xs font-medium rounded-full">
                        {meal.category.charAt(0).toUpperCase() +
                            meal.category.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 grid gap-3">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {meal.meal_name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {meal.desc}
                </p>

                {/* Calories */}
                <div className="flex items-center gap-1 text-gray-700">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">
                        {meal.calories} calories
                    </span>
                </div>

                {/* Diet Badges */}
                <div className="flex flex-wrap gap-1.5">
                    {meal.diet_type.slice(0, 2).map((diet, index) => (
                        <span
                            key={index}
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded-full",
                                getDietBadgeColor(diet)
                            )}>
                            {diet}
                        </span>
                    ))}
                    {meal.diet_type.length > 2 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            +{meal.diet_type.length - 2}
                        </span>
                    )}
                </div>

                {/* View Details Button */}
                <Button
                    size="sm"
                    className="w-full border border-slate-300 transition-colors duration-300 hover:bg-cyan-600 text-slate-700 hover:text-slate-100 mt-3 py-4"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetail();
                    }}>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
};
export default MealCard;
