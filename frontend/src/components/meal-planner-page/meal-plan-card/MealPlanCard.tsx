import React from "react";
import { Clock, Flame, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import type { Meal } from "@/types/meals.types";
import { formatMealImage } from "@/utils/helpers/format.helper";


interface MealPlanCardProps {
    meal: Meal & { 
        planTime?: string; 
        recipe?: { cook_time?: number }; 
    };
    onRemove?: () => void;
    className?: string;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({
    meal,
    onRemove,
    className,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/meal-menu/${meal.meal_id}`);
    };

    return (
        <div
            className={cn(
                "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer",
                className
            )}>
            <div className="relative">
                <img
                    src={formatMealImage(meal.image)}
                    alt={meal.meal_name}
                    className="w-full h-32 object-cover"
                    onClick={handleClick}
                    onError={(e) => { e.currentTarget.src = "@/assets/images/menu/no-image.jpg" }}
                />

                {onRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                        <X className="h-4 w-4 text-red-600" />
                    </button>
                )}
            </div>

            <div className="p-4" onClick={handleClick}>
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">
                    {meal.meal_name}
                </h4>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>{meal.calories} cal</span>
                    </div>

                    {meal.recipe?.cook_time && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{meal.recipe.cook_time} phút</span>
                        </div>
                    )}
                </div>

                {/* Diet badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                    {meal.diet_type.slice(0, 2).map((diet, index) => (
                        <span
                            key={index}
                            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {diet}
                        </span>
                    ))}
                    {meal.diet_type.length > 2 && (
                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            +{meal.diet_type.length - 2}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MealPlanCard;
