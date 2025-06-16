import { axiosInstance } from "./axiosConfig";

export const recipeService = {
    // PUBLIC ROUTES

    // Lấy danh sách recipes
    getRecipes: async (page = 1) => {
        const response = await axiosInstance.get("/api/recipe", {
            params: { page },
        });
        return response.data;
    },

    // Lấy chi tiết recipe
    getRecipeById: async (recipeId: number) => {
        const response = await axiosInstance.get(`/api/recipe/${recipeId}`);
        return response.data;
    },

    // AUTHENTICATED ROUTES

    // Tạo recipe mới
    createRecipe: async (recipeData: any) => {
        const response = await axiosInstance.post(
            "/api/user/recipe",
            recipeData
        );
        return response.data;
    },

    // Cập nhật recipe
    updateRecipe: async (recipeId: number, recipeData: any) => {
        const response = await axiosInstance.put(
            `/api/user/recipe/${recipeId}`,
            recipeData
        );
        return response.data;
    },

    // Xóa recipe
    deleteRecipe: async (recipeId: number) => {
        const response = await axiosInstance.delete(
            `/api/user/recipe/${recipeId}`
        );
        return response.data;
    },
};