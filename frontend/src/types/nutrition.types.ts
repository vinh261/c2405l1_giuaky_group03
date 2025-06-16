

export interface NutritionIngredient {
    id: string;
    name: string;
    category: string;
    serving_size: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

// Selected ingredient with quantity
export interface SelectedIngredient extends NutritionIngredient {
    quantity: number; // in grams
}

// Nutrition totals
export interface NutritionTotals {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

// Daily recommended values
export interface DailyValues {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

// Nutrition data structure from JSON
export interface NutritionData {
    ingredients: NutritionIngredient[];
    dailyValues?: DailyValues;
}

// Nutrition row props
export type NutrientRowProps = {
    label: string;
    value: number;
    unit: string;
    dailyValue: number;
    isCalories?: boolean;
}