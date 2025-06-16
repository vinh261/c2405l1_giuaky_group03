import { mockMeals } from "@/data/mockMeals.data";
import type { Meal, MealDetailResponse, MealFilterParams, MealListResponse, MealWithDetails } from "@/types/meals.types";
import client from "./client";


// For development - switch between mock and real API
const USE_MOCK_DATA = false; // Set to false when backend is ready

/**
 * Get paginated meals list
 */
export const getMeals = async (
    params?: MealFilterParams
): Promise<MealListResponse> => {
    if (USE_MOCK_DATA) {
        // Mock implementation
        let filteredMeals = [...mockMeals];

        // Apply filters
        if (params?.category) {
            filteredMeals = filteredMeals.filter(
                (meal) => meal.category === params.category
            );
        }

        if (params?.diet_type && params.diet_type.length > 0) {
            filteredMeals = filteredMeals.filter((meal) =>
                params.diet_type!.some((diet) => meal.diet_type.includes(diet))
            );
        }

        if (params?.min_calories) {
            filteredMeals = filteredMeals.filter(
                (meal) => meal.calories >= params.min_calories!
            );
        }

        if (params?.max_calories) {
            filteredMeals = filteredMeals.filter(
                (meal) => meal.calories <= params.max_calories!
            );
        }

        if (params?.search) {
            const searchTerm = params.search.toLowerCase();
            filteredMeals = filteredMeals.filter(
                (meal) =>
                    meal.meal_name.toLowerCase().includes(searchTerm) ||
                    meal.desc.toLowerCase().includes(searchTerm)
            );
        }

        // Pagination
        const page = params?.page || 1;
        const perPage = params?.per_page || 12;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        const paginatedMeals = filteredMeals.slice(start, end);

        return {
            data: paginatedMeals,
            current_page: page,
            per_page: perPage,
            total: filteredMeals.length,
            last_page: Math.ceil(filteredMeals.length / perPage),
        };
    }

    // Real API call
    const response = await client.get<MealListResponse>("/api/meal", {
        params,
    });
    return response.data;
};

/**
 * Get single meal details
 */
export const getMealDetail = async (
    mealId: string
): Promise<MealDetailResponse> => {
    if (USE_MOCK_DATA) {
        const meal = mockMeals.find((m) => m.meal_id === mealId);

        if (!meal) {
            throw new Error("Meal not found");
        }

        // Mock detailed data
        const mealWithDetails: MealWithDetails = {
            ...meal,
            recipe: {
                recipe_id: meal.recipe_id,
                cuisine_type: "Vietnamese",
                desc_step:
                    "1. Chuẩn bị nguyên liệu\n2. Sơ chế rau củ\n3. Nấu theo công thức\n4. Trình bày và thưởng thức",
                cook_time: 30,
                serve: 2,
                created_by: "Chef Vietnam",
                created_at: meal.created_at,
                updated_at: meal.updated_at,
            },
            nutrition: {
                meal_id: meal.meal_id,
                calories: meal.calories,
                protein: Math.round((meal.calories * 0.15) / 4), // Rough estimate
                carbs: Math.round((meal.calories * 0.5) / 4),
                fat: Math.round((meal.calories * 0.35) / 9),
                fiber: 5,
                sugar: 8,
                sodium: 480,
            },
            tags: meal.diet_type.map((diet, index) => ({
                tag_id: `TAG-${index + 1}`,
                meal_id: meal.meal_id,
                tag_name: diet,
            })),
        };

        return {
            data: mealWithDetails,
            message: "Meal details retrieved successfully",
        };
    }

    // Real API call
    const response = await client.get<MealDetailResponse>(
        `/api/meal/${mealId}`
    );
    return response.data;
};

/**
 * Get meals by category
 */
export const getMealsByCategory = async (
    category: string,
    params?: Omit<MealFilterParams, "category">
): Promise<MealListResponse> => {
    return getMeals({ ...params, category: category as MealFilterParams["category"] });
};

/**
 * Search meals
 */
export const searchMeals = async (
    searchTerm: string,
    params?: Omit<MealFilterParams, "search">
): Promise<MealListResponse> => {
    return getMeals({ ...params, search: searchTerm });
};

/**
 * Get featured meals (for homepage)
 */
export const getFeaturedMeals = async (limit: number = 8): Promise<Meal[]> => {
    if (USE_MOCK_DATA) {
        // Return random meals as featured
        const shuffled = [...mockMeals].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
    }

    // Real API call
    const response = await client.get<{ data: Meal[] }>(
        "/api/meal",
        {
            params: { limit },
        }
    );
    return response.data.data;
};

/**
 * Get meals by diet type
 */
export const getMealsByDietType = async (
    dietTypes: string[],
    params?: Omit<MealFilterParams, "diet_type">
): Promise<MealListResponse> => {
    return getMeals({ ...params, diet_type: dietTypes as MealFilterParams["diet_type"] });
};
