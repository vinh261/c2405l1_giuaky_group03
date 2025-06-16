import { useEffect, useState, useCallback } from "react";
import type { Meal, MealFilters } from "../types/test.type";
import { mealService } from "../services/mealApi";



export const useMeals = (initialPage = 1) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<MealFilters>({});

    const fetchMeals = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await mealService.getMeals(currentPage, filters);

            setMeals(Array.isArray(response.data) ? response.data : []);
            setTotalPages(response.last_page || 1);
        } catch (err) {
            setError("Không thể tải danh sách món ăn");
            console.error("Error fetching meals:", err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    const updateFilters = (newFilters: MealFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    return {
        meals,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
        updateFilters,
        refetch: fetchMeals,
    };
};