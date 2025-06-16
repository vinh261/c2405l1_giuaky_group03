import { axiosInstance } from "./axiosConfig";

export const mealPlanService = {
    // Lấy danh sách meal plans
    getMealPlans: async () => {
        const response = await axiosInstance.get("/api/user/plan");
        return response.data;
    },

    // Lấy chi tiết meal plan
    getMealPlanById: async (planId: number) => {
        const response = await axiosInstance.get(`/api/user/plan/${planId}`);
        return response.data;
    },

    // Tạo meal plan mới
    createMealPlan: async (planData: any) => {
        const response = await axiosInstance.post("/api/user/plan", planData);
        return response.data;
    },

    // Cập nhật meal plan
    updateMealPlan: async (planId: number, planData: any) => {
        const response = await axiosInstance.put(
            `/api/user/plan/${planId}`,
            planData
        );
        return response.data;
    },

    // Xóa meal plan
    deleteMealPlan: async (planId: number) => {
        const response = await axiosInstance.delete(`/api/user/plan/${planId}`);
        return response.data;
    },
};
