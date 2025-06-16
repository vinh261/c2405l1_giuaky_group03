
export interface User {
    user_id: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Profile {
    profile_id: string;
    user_name?: string;
    phone?: string;
    image?: string;
    status: "active" | "inactive";
    gender: "male" | "female" | "other";
    dob?: string;
    job?: string;
    height: number;
    weight: number;
    address?: string;
    note?: string;
    role: "user" | "admin";
    created_at: string;
    updated_at: string;
}

export interface Ingredient {
    ingredient_id: number;
    ingredient_name: string;
    unit: "kg" | "g" | "l" | "ml";
    created_at: string;
    updated_at: string;
}

export interface RecipeIngredient {
    recipe_id: number;
    ingredient_id: number;
    quantity: number;
    units: "kg" | "g" | "l" | "ml";
    ingredient_name: string;
}

export interface NutritionInfo {
    nutrition_id: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    calories: number;
    recipe_id: number;
}

export interface Recipe {
    recipe_id: number;
    cuisine_type: string;
    desc_step: string;
    cook_time: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    ingredients?: RecipeIngredient[];
    nutrition?: NutritionInfo;
}

export interface Tag {
    tag_id: number;
    tag_name: string;
    created_at: string;
    updated_at: string;
}

export interface Meal {
    meal_id: number;
    meal_name: string;
    diet_type: string;
    image?: string;
    desc: string;
    recipe_id: number;
    recipe?: Recipe;
    tags?: Tag[];
    nutrition?: NutritionInfo;
}

export interface Category {
    category_id: number;
    category_name: string;
    image?: string;
    created_at: string;
    updated_at: string;
}
export type Favorite = {
    id: number;
    meal_id: number;
    user_id: string;
    meal?: Meal;
}
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: number;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

export interface MealFilters {
    search?: string;
    tag?: number;
    category?: string;
    diet_type?: string;
    min_calories?: number;
    max_calories?: number;
}