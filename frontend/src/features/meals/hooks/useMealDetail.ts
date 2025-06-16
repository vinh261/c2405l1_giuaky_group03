import { useState, useEffect } from "react";
import type { Meal } from "../types/test.type";
import { mealService } from "../services/mealApi";



export const useMealDetail = (mealId: number | null) => {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mealId) {
            setMeal(null);
            return;
        }

        const fetchMealDetail = async () => {
            try {
                console.log("Fetching meal detail for ID:", mealId);
                setLoading(true);
                setError(null);

                // Gọi API public không cần auth
                const response = await mealService.getMealById(mealId);
                console.log("Meal detail response:", response);

                if (response.data) {
                    setMeal(response.data);
                }
            } catch (err: unknown) {
                // Log chi tiết lỗi
                console.error("Error fetching meal detail:", err);
                if (typeof err === "object" && err !== null && "response" in err) {
                    console.error("Error response:", err.response);
                }
                setError("Không thể tải chi tiết món ăn");
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetail();
    }, [mealId]);

    return { meal, loading, error };
};