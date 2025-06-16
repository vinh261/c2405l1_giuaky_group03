import { axiosInstance } from "./axiosConfig";

export const recommendService = {
    // Lấy danh sách recommendations
    getRecommendations: async () => {
        const response = await axiosInstance.get("/api/user/recommend");
        return response.data;
    },

    // Lấy chi tiết recommendation
    getRecommendationById: async (recommendId: number) => {
        const response = await axiosInstance.get(
            `/api/user/recommend/${recommendId}`
        );
        return response.data;
    },
};
