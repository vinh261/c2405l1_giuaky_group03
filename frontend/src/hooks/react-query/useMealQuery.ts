import { getFeaturedMeals, getMealDetail, getMeals, getMealsByCategory, getMealsByDietType, searchMeals } from "@/services/api/publicMeals.service";
import type { MealFilterParams } from "@/types/meals.types";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";


// Query keys
export const mealKeys = {
    all: ["meals"] as const,
    lists: () => [...mealKeys.all, "list"] as const,
    list: (filters?: MealFilterParams) =>
        [...mealKeys.lists(), filters] as const,
    details: () => [...mealKeys.all, "detail"] as const,
    detail: (id: string) => [...mealKeys.details(), id] as const,
    featured: () => [...mealKeys.all, "featured"] as const,
    category: (category: string) =>
        [...mealKeys.all, "category", category] as const,
    search: (term: string) => [...mealKeys.all, "search", term] as const,
    diet: (types: string[]) => [...mealKeys.all, "diet", types] as const,
};

/**
 * Hook to get paginated meals
 */
export const useMeals = (params?: MealFilterParams) => {
    return useQuery({
        queryKey: mealKeys.list(params),
        queryFn: () => getMeals(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData,
    });
};

/**
 * Hook to get meal details
 */
export const useMealDetail = (mealId: string) => {
    return useQuery({
        queryKey: mealKeys.detail(mealId),
        queryFn: () => getMealDetail(mealId),
        enabled: !!mealId,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

/**
 * Hook to get meals by category
 */
export const useMealsByCategory = (
    category: string,
    params?: Omit<MealFilterParams, "category">
) => {
    return useQuery({
        queryKey: mealKeys.category(category),
        queryFn: () => getMealsByCategory(category, params),
        enabled: !!category,
        staleTime: 5 * 60 * 1000,
    });
};

/**
 * Hook to search meals
 */
export const useSearchMeals = (
    searchTerm: string,
    params?: Omit<MealFilterParams, "search">,
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: mealKeys.search(searchTerm),
        queryFn: () => searchMeals(searchTerm, params),
        enabled: options?.enabled !== false && searchTerm.length > 0,
        staleTime: 5 * 60 * 1000,
    });
};

/**
 * Hook to get featured meals
 */
export const useFeaturedMeals = (limit?: number) => {
    return useQuery({
        queryKey: mealKeys.featured(),
        queryFn: () => getFeaturedMeals(limit),
        staleTime: 10 * 60 * 1000,
    });
};

/**
 * Hook to get meals by diet type
 */
export const useMealsByDietType = (
    dietTypes: string[],
    params?: Omit<MealFilterParams, "diet_type">
) => {
    return useQuery({
        queryKey: mealKeys.diet(dietTypes),
        queryFn: () => getMealsByDietType(dietTypes, params),
        enabled: dietTypes.length > 0,
        staleTime: 5 * 60 * 1000,
    });
};

/**
 * Hook for infinite scroll meals
 */
export const useInfiniteMeals = (
    baseParams?: Omit<MealFilterParams, "page">
) => {
    return useInfiniteQuery({
        queryKey: mealKeys.list(baseParams),
        queryFn: ({ pageParam = 1 }) =>
            getMeals({ ...baseParams, page: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
    });
};