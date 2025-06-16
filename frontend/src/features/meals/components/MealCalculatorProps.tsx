import { useEffect, useState } from "react";
import type { Ingredient, IngredientItem } from "../types/meals.types";
import { nutritionDatabase } from "../services/TestMealApi";


const MealCalculatorProps = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [totalNutrition, setTotalNutrition] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
    });

    // Filter ingredients dựa trên search
    const filteredIngredients = Object.entries(nutritionDatabase).filter(
        ([, item]) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addIngredient = (key: string, item: IngredientItem) => {
        const newIngredient: Ingredient = {
            id: Date.now(),
            key: key,
            name: item.name,
            quantity: item.unit === "g" ? 100 : 1,
            unit: item.unit,
            per: item.per,
            nutrition: item.nutrition,
        };
        setIngredients([...ingredients, newIngredient]);
        setSearchTerm("");
        setShowSearch(false);
    };

    // Xóa ingredient
    interface RemoveIngredientFn {
        (id: number): void;
    }

    const removeIngredient: RemoveIngredientFn = (id) => {
        setIngredients(ingredients.filter((ing) => ing.id !== id));
    };

    // Update quantity
    interface UpdateQuantityFn {
        (id: number, newQuantity: string | number): void;
    }

    const updateQuantity: UpdateQuantityFn = (id, newQuantity) => {
        setIngredients(
            ingredients.map((ing) =>
                ing.id === id
                    ? {
                          ...ing,
                          quantity: parseFloat(newQuantity as string) || 0,
                      }
                    : ing
            )
        );
    };

    // Tính toán nutrition
    useEffect(() => {
        const total = ingredients.reduce(
            (acc, ing) => {
                const multiplier = ing.quantity / ing.per;

                return {
                    calories:
                        acc.calories + ing.nutrition.calories * multiplier,
                    protein: acc.protein + ing.nutrition.protein * multiplier,
                    carbs: acc.carbs + ing.nutrition.carbs * multiplier,
                    fat: acc.fat + ing.nutrition.fat * multiplier,
                    fiber: acc.fiber + ing.nutrition.fiber * multiplier,
                    sugar: acc.sugar + ing.nutrition.sugar * multiplier,
                };
            },
            {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                fiber: 0,
                sugar: 0,
            }
        );

        setTotalNutrition(total);
    }, [ingredients]);

    return {
        showSearch,
        totalNutrition,
        filteredIngredients,
        addIngredient,
        removeIngredient,
        updateQuantity,
        ingredients,
        searchTerm
    };
};

export default MealCalculatorProps;
