import client from "@/services/api/client";
import type { UserManage } from "@/types/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";


export const useManageUser = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">(
        "all"
    );
    const [selectedUser, setSelectedUser] = useState<UserManage | null>(null);

    // Fetch users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["admin-users", searchTerm, roleFilter],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (searchTerm) params.append("search", searchTerm);
            if (roleFilter !== "all") params.append("role", roleFilter);

            const response = await client.get<UserManage[]>(
                `/api/admin/users?${params}`
            );
            return response.data;
        },
    });

    // Update user role mutation
    const updateRoleMutation = useMutation({
        mutationFn: async ({
            userId,
            role,
        }: {
            userId: string;
            role: string;
        }) => {
            return client.patch(`/api/admin/users/${userId}/role`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("Cập nhật quyền người dùng thành công");
        },
        onError: () => {
            toast.error("Không thể cập nhật quyền người dùng");
        },
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            return client.delete(`/api/admin/users/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("Xóa người dùng thành công");
        },
        onError: () => {
            toast.error("Không thể xóa người dùng");
        },
    });

    const handleToggleRole = (user: UserManage) => {
        const newRole = user.profile?.role === "admin" ? "user" : "admin";
        updateRoleMutation.mutate({ userId: user.user_id, role: newRole });
    };

    const handleDeleteUser = (userId: string) => {
        if (
            confirm(
                "Bạn có chắc muốn xóa người dùng này? Hành động này không thể hoàn tác."
            )
        ) {
            deleteUserMutation.mutate(userId);
        }
    };

    return {
        users,
        isLoading,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        selectedUser,
        setSelectedUser,
        updateRoleMutation,
        deleteUserMutation,
        handleToggleRole,
        handleDeleteUser,
    }
}