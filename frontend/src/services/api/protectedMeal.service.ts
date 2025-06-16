import type { ApiResponse, CreateMealData, FavoriteResponse, Meal } from "@/types/meals.types";
import client from "./client";


/**
 * Create new meal (protected)
 */
export const createMeal = async (data: CreateMealData): Promise<Meal> => {
    const response = await client.post<ApiResponse<Meal>>(
        "/api/user/meal",
        data
    );
    return response.data.meal || response.data.data!;
};

/**
 * Update meal (protected)
 */
export const updateMeal = async (
    mealId: string,
    data: Partial<CreateMealData>
): Promise<Meal> => {
    const response = await client.put<ApiResponse<Meal>>(
        `/api/user/meal/${mealId}`,
        data
    );
    return response.data.meal || response.data.data!;
};

/**
 * Delete meal (protected)
 */
export const deleteMeal = async (mealId: string): Promise<void> => {
    await client.delete(`/api/user/meal/${mealId}`);
};

/**
 * Get user's created meals
 */
export const getUserMeals = async (): Promise<Meal[]> => {
    const response = await client.get<{ data: Meal[] }>(
        "/api/user/meals/created"
    );
    return response.data.data;
};

/**
 * Get user's favorite meals
 */
export const getFavorites = async (): Promise<Meal[]> => {
    const response = await client.get<FavoriteResponse>('/api/user/wishlist');
    return response.data.data || [];
};

/**
 * Add meal to favorites
 */
export const addFavorite = async (mealId: string): Promise<void> => {
    await client.post(`/api/user/wishlist`, { meal_id: mealId });
};

/**
 * Remove meal from favorites
 */
export const removeFavorite = async (mealId: string): Promise<void> => {
    await client.delete(`/api/user/wishlist/${mealId}`);
};
