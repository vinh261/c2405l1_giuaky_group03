// import thitbo from "@/assets/images/thitboxaodongco.png"
import { Button } from "@/libs/shadcn/button";
import type { Meal } from "../../types/test.type";
// import { useFavorites } from "../../hooks/useFavorite";


interface MealDetailProps {
    meal: Meal;
}

const MealDetail: React.FC<MealDetailProps> = ({ meal }) => {
    // const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <div className="grid grid-cols-2 p-4 bg-slate-100 border border-slate-400 rounded-lg">
            <img 
                src={meal.image || '../../../../assets/images/image.png'} 
                alt={meal.meal_name} 
                className="rounded-lg" 
                loading="lazy" 
            />

            <span className="pl-4 flex flex-col gap-4">
                <h3 className="text-3xl font-semibold">{meal.meal_name}</h3>
                
                <p>{meal.desc}</p>

                {/* Hiển thị ingredients nếu có */}
                {meal.recipe?.ingredients && meal.recipe.ingredients.length > 0 && (
                    <div>
                        <p className="font-semibold">Nguyên liệu:</p>
                        <ul className="list-disc list-inside">
                            {meal.recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx}>
                                    {ingredient.ingredient_name}: {ingredient.quantity} {ingredient.units}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <p className="font-semibold">Thành phần dinh dưỡng:</p>
                    <ul>
                        <li>Calories: {meal.nutrition?.calories || 0} kcal</li>
                        <li>Carbohydrate: {meal.nutrition?.carbohydrate || 0}g</li>
                        <li>Chất béo: {meal.nutrition?.fat || 0}g</li>
                        <li>Protein: {meal.nutrition?.protein || 0}g</li>
                    </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                    {meal.tags && meal.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-200 rounded text-sm">{tag.tag_name}</span>
                    ))}
                </div>

                <div>
                    <Button className="border border-slate-300">
                        Thích
                    </Button>
                    <Button>
                        Đánh giá
                    </Button>
                    <Button>
                        Chi tiết công thức
                    </Button>
                </div>

                {/* Recipe steps */}
                {meal.recipe?.desc_step && (
                    <div className="border border-slate-300 bg-slate-50 rounded-lg p-2 h-39 overflow-auto [scrollbar-width:thin]">
                        <p className="font-semibold mb-2">Cách làm:</p>
                        <p>{meal.recipe.desc_step}</p>
                    </div>
                )}

                {meal.recipe?.created_by && (
                    <p className="border border-slate-300 bg-slate-50 rounded-lg p-2 h-39 overflow-auto [scrollbar-width:thin]">
                        Người tạo: {meal.recipe.created_by}
                    </p>
                )}
            </span>
        </div>
    );
};

export default MealDetail;