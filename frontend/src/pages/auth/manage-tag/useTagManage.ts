import client from "@/services/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";


interface TagType {
    tag_id: string;
    tag_name: string;
    meals_count: number;
    created_at: string;
}

export const useTagManage = () => {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editingTag, setEditingTag] = useState<TagType | null>(null);
    const [tagName, setTagName] = useState("");

    // Fetch tags
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ["admin-tags"],
        queryFn: async () => {
            const response = await client.get<TagType[]>("/api/tag");
            return response.data;
        },
    });

    // Create tag mutation
    const createTagMutation = useMutation({
        mutationFn: async (name: string) => {
            return client.post("/api/admin/tag", { tag_name: name });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
            toast.success("Tạo tag thành công");
            setShowForm(false);
            setTagName("");
        },
        onError: () => {
            toast.error("Không thể tạo tag");
        },
    });

    return {
        tags,
        isLoading,
        showForm,
        setShowForm,
        editingTag,
        setEditingTag,
        tagName,
        setTagName,
        createTagMutation,
    }
}