import type { NutritionTotals, SelectedIngredient } from "@/types/nutrition.types";


/**
 * Calculate total nutritional values from selected ingredients
 */
export const calculateNutrition = (
    ingredients: SelectedIngredient[]
): NutritionTotals => {
    const totals: NutritionTotals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
    };

    ingredients.forEach((ingredient) => {
        // Calculate multiplier based on quantity vs serving size
        // Assuming serving_size is in format "100g" or "1 cup (240g)"
        const servingSizeInGrams = extractGramsFromServingSize(
            ingredient.serving_size
        );
        const multiplier = ingredient.quantity / servingSizeInGrams;

        // Calculate nutritional values
        totals.calories += ingredient.calories * multiplier;
        totals.protein += ingredient.protein * multiplier;
        totals.carbs += ingredient.carbs * multiplier;
        totals.fat += ingredient.fat * multiplier;
        totals.fiber += ingredient.fiber * multiplier;
        totals.sugar += ingredient.sugar * multiplier;
        totals.sodium += ingredient.sodium * multiplier;
    });

    // Round all values to 1 decimal place
    return {
        calories: Math.round(totals.calories * 10) / 10,
        protein: Math.round(totals.protein * 10) / 10,
        carbs: Math.round(totals.carbs * 10) / 10,
        fat: Math.round(totals.fat * 10) / 10,
        fiber: Math.round(totals.fiber * 10) / 10,
        sugar: Math.round(totals.sugar * 10) / 10,
        sodium: Math.round(totals.sodium * 10) / 10,
    };
};

/**
 * Extract grams from serving size string
 * Examples: "100g" -> 100, "1 cup (240g)" -> 240
 */
const extractGramsFromServingSize = (servingSize: string): number => {
    // Look for pattern like "100g" or "(240g)"
    const match = servingSize.match(/(\d+)g/);

    if (match && match[1]) {
        return parseInt(match[1], 10);
    }

    // Default to 100g if no match found
    return 100;
};

/**
 * Get daily value percentage for a nutrient
 */
export const getDailyValuePercentage = (
    value: number,
    dailyValue: number
): number => {
    if (dailyValue === 0) return 0;
    return Math.round((value / dailyValue) * 100);
};

/**
 * Format nutrient value with appropriate decimal places
 */
export const formatNutrientValue = (
    value: number,
    decimals: number = 1
): string => {
    return value.toFixed(decimals);
};

/**
 * Get color class based on daily value percentage
 */
export const getNutrientColorClass = (percentage: number): string => {
    if (percentage > 100) return "text-red-600";
    if (percentage > 75) return "text-yellow-600";
    return "text-green-600";
};

/**
 * Get progress bar color class based on percentage
 */
export const getProgressBarColorClass = (percentage: number): string => {
    if (percentage > 100) return "bg-red-500";
    if (percentage > 75) return "bg-yellow-500";
    return "bg-green-500";
};

/**
 * Validate if ingredient quantity is valid
 */
export const isValidQuantity = (quantity: number): boolean => {
    return quantity > 0 && quantity <= 10000; // Max 10kg
};

/**
 * Get default daily values based on 2000 calorie diet
 */
export const getDefaultDailyValues = () => ({
    calories: 2000,
    protein: 50,
    carbs: 300,
    fat: 65,
    fiber: 25,
    sugar: 50,
    sodium: 2300,
});