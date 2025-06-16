import { axiosInstance } from "@/types/axios-config";
import type { ApiResponse, Meal, MealFilters } from "../types/test.type";



export const mealService = {
    // PUBLIC ROUTES

    // Lấy danh sách meals (public)
    getMeals: async (page = 1, filters?: MealFilters) => {
        const params = {
            page,
            ...filters,
        };
        const response = await axiosInstance.get<{data: ApiResponse<Meal>}>('/api/meal', { params });
        return response.data.data || response.data;
    },

    // Lấy chi tiết một meal (public)
    getMealById: async (mealId: number) => {
        const response = await axiosInstance.get<ApiResponse<Meal>>(
            `/api/meal/${mealId}`
        );
        return response.data;;
    },

    // AUTHENTICATED ROUTES (cần login)

    // Thêm meal mới
    createMeal: async (mealData: FormData) => {
        const response = await axiosInstance.post("/api/user/meal", mealData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    // Cập nhật meal
    updateMeal: async (mealId: number, mealData: FormData) => {
        mealData.append("_method", "PUT");
        const response = await axiosInstance.post(
            `/api/user/meal/${mealId}`,
            mealData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    },

    // Xóa meal
    deleteMeal: async (mealId: number) => {
        const response = await axiosInstance.delete(`/api/user/meal/${mealId}`);
        return response.data;
    },

     // Lấy danh sách favorites
    getFavorites: async () => {
        const response = await axiosInstance.get<ApiResponse<Meal[]>>('/api/user/wishlist');
        return response.data;
    },

    // Thêm meal vào favorites
    addToFavorites: async (mealId: number) => {
        const response = await axiosInstance.post(`/api/user/meals/${mealId}/wishlist`);
        return response.data;
    },

    // Xóa meal khỏi favorites
    removeFromFavorites: async (mealId: number) => {
        const response = await axiosInstance.delete(`/api/user/meals/${mealId}/wishlist`);
        return response.data;
    },
};