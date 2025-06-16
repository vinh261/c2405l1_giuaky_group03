import { axiosInstance } from "./axiosConfig";
import type { Tag } from "@/types/test.type";

export const tagService = {
    // PUBLIC ROUTES

    // Lấy danh sách tags
    getTags: async () => {
        const response = await axiosInstance.get<{ data: Tag[] }>("/api/tag");
        return response.data;
    },

    // Lấy chi tiết tag
    getTagById: async (tagId: number) => {
        const response = await axiosInstance.get(`/api/tag/${tagId}`);
        return response.data;
    },

    // ADMIN ONLY ROUTES

    // Tạo tag mới (admin only)
    createTag: async (tagData: { tag_name: string }) => {
        const response = await axiosInstance.post("/api/admin/tag", tagData);
        return response.data;
    },

    // Cập nhật tag (admin only)
    updateTag: async (tagId: number, tagData: { tag_name: string }) => {
        const response = await axiosInstance.put(
            `/api/admin/tag/${tagId}`,
            tagData
        );
        return response.data;
    },

    // Xóa tag (admin only)
    deleteTag: async (tagId: number) => {
        const response = await axiosInstance.delete(`/api/admin/tag/${tagId}`);
        return response.data;
    },
};
