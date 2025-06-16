import { axiosInstance } from "@/types/axios-config";


export const favoriteService = {
    // Lấy danh sách favorites (wishlist)
    getFavorites: async () => {
        const response = await axiosInstance.get("/api/user/wishlist");
        return response.data;
    },

    // Thêm vào favorites
    addToFavorites: async (mealId: number) => {
        const response = await axiosInstance.post("/api/user/wishlist", {
            meal_id: mealId,
        });
        return response.data;
    },

    // Xóa khỏi favorites
    removeFromFavorites: async (favoriteId: number) => {
        const response = await axiosInstance.delete(
            `/api/user/wishlist/${favoriteId}`
        );
        return response.data;
    },
};
