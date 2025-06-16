import type { Meal, MealPlan } from "@/types/meals.types";
import client from "./client";



export type CreatePlanData = {
    plan_name: string;
    start_date: string;
    end_date: string;
}

export type AddMealToPlanData = {
    meal_id: string;
    day: string;
    time: "breakfast" | "lunch" | "dinner" | "snack";
}

/**
 * Get user's meal plans
 */
export const getMealPlans = async (): Promise<MealPlan[]> => {
    const response = await client.get<MealPlan[]>("/api/user/plan");
    return Array.isArray(response.data) ? response.data : [];
};

/**
 * Get single meal plan
 */
export const getMealPlan = async (planId: string): Promise<MealPlan> => {
    const response = await client.get<MealPlan>(`/api/user/plan/${planId}`);
    return response.data;
};

/**
 * Create new meal plan (using store method)
 */
export const createMealPlan = async (
    data: CreatePlanData
): Promise<MealPlan> => {
    const response = await client.post<{ success: boolean; plan: MealPlan }>(
        "/api/user/plan",
        data
    );
    return response.data.plan;
};

/**
 * Update meal plan (using update method)
 */
export const updateMealPlan = async (
    planId: string,
    data: Partial<CreatePlanData>
): Promise<MealPlan> => {
    const response = await client.put<{ success: boolean; plan: MealPlan }>(
        `/api/user/plan/${planId}`,
        data
    );
    return response.data.plan;
};

/**
 * Delete meal plan (using destroy method)
 */
export const deleteMealPlan = async (planId: string): Promise<void> => {
    await client.delete(`/api/user/plan/${planId}`);
};

/**
 * Add meal to plan
 */
export const addMealToPlan = async (
    planId: string,
    data: AddMealToPlanData
): Promise<void> => {
    await client.post(`/api/user/plan/${planId}/meals`, data);
};

/**
 * Remove meal from plan
 */
export const removeMealFromPlan = async (
    planId: string,
    mealId: string
): Promise<void> => {
    await client.delete(`/api/user/plan/${planId}/meals/${mealId}`);
};

/**
 * Get meals for specific date range
 */
export const getMealsForDateRange = async (
    startDate: string,
    endDate: string
): Promise<Meal[]> => {
    const response = await client.get<{ data: Meal[] }>(
        "/api/user/plan/meals",
        {
            params: { start_date: startDate, end_date: endDate },
        }
    );
    return response.data.data;
};
