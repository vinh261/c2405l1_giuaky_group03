import client from "@/services/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";


interface Category {
    category_id: string;
    category_name: string;
    meals_count: number;
    created_at: string;
}

export const useCategoryManage = () => {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [categoryName, setCategoryName] = useState("");

    // Fetch categories
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["admin-categories"],
        queryFn: async () => {
            const response = await client.get<Category[]>(
                "/api/admin/categories"
            );
            return response.data;
        },
    });

    // Create category mutation
    const createCategoryMutation = useMutation({
        mutationFn: async (name: string) => {
            return client.post("/api/admin/categories", {
                category_name: name,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            toast.success("Tạo danh mục thành công");
            setShowForm(false);
            setCategoryName("");
        },
        onError: () => {
            toast.error("Không thể tạo danh mục");
        },
    });

    // Update category mutation
    const updateCategoryMutation = useMutation({
        mutationFn: async ({ id, name }: { id: string; name: string }) => {
            return client.put(`/api/admin/categories/${id}`, {
                category_name: name,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            toast.success("Cập nhật danh mục thành công");
            setEditingCategory(null);
            setCategoryName("");
        },
        onError: () => {
            toast.error("Không thể cập nhật danh mục");
        },
    });

    // Delete category mutation
    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            return client.delete(`/api/admin/categories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            toast.success("Xóa danh mục thành công");
        },
        onError: () => {
            toast.error("Không thể xóa danh mục");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        if (editingCategory) {
            updateCategoryMutation.mutate({
                id: editingCategory.category_id,
                name: categoryName,
            });
        } else {
            createCategoryMutation.mutate(categoryName);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setCategoryName(category.category_name);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
            deleteCategoryMutation.mutate(id);
        }
    };

    const categoryDisplayNames: Record<string, string> = {
        breakfast: "Bữa sáng",
        lunch: "Bữa trưa",
        dinner: "Bữa tối",
        snacks: "Ăn vặt",
        smoothies: "Smoothies",
    };

    return {
        categories,
        isLoading,
        showForm,
        setShowForm,
        editingCategory,
        setEditingCategory,
        categoryName,
        setCategoryName,
        createCategoryMutation,
        updateCategoryMutation,
        deleteCategoryMutation,
        handleSubmit,
        handleEdit,
        handleDelete,
        categoryDisplayNames,
    };
}