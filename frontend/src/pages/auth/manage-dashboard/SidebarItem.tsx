import type { SidebarItem } from "@/types/auth.types";
import { BarChart3, FileText, FolderOpen, Heart, Star, Tag, Users, UtensilsCrossed, } from "lucide-react";
// components
import DashboardStats from "@/components/auth/dashboard-statistic/DasboardStats";
import UserManagement from "../manage-user/UserManagement";
import CategoryManagement from "../manage-category/CategoryManagement";
import TagManagement from "../manage-tag/TagManage";
import ReviewManagement from "../manage-review/ReviewManage";
import FavoriteStats from "../manage-fav/FavStats";
import MealManagement from "../manage-meal/MealManagement";


export const sidebarItems: SidebarItem[] = [
    {
        id: "dashboard",
        label: "Tổng quan",
        icon: <BarChart3 className="h-5 w-5" />,
        component: <DashboardStats />,
        path: "",
    },
    {
        id: "users",
        label: "Người dùng",
        icon: <Users className="h-5 w-5" />,
        component: <UserManagement />,
        path: "users",
    },
    {
        id: "meals",
        label: "Món ăn",
        icon: <UtensilsCrossed className="h-5 w-5" />,
        component: <MealManagement />,
        path: "meals",
    },
    {
        id: "categories",
        label: "Danh mục",
        icon: <FolderOpen className="h-5 w-5" />,
        component: <CategoryManagement />,
        path: "categories",
    },
    {
        id: "tags",
        label: "Thẻ tags",
        icon: <Tag className="h-5 w-5" />,
        component: <TagManagement />,
        path: "tags",
    },
    {
        id: "reviews",
        label: "Đánh giá",
        icon: <Star className="h-5 w-5" />,
        component: <ReviewManagement />,
        path: "reviews",
    },
    {
        id: "favorites",
        label: "Yêu thích",
        icon: <Heart className="h-5 w-5" />,
        component: <FavoriteStats />,
        path: "favorites",
    },
    {
        id: "blogs",
        label: "Bài viết",
        icon: <FileText className="h-5 w-5" />,
        component: (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Tính năng blog sẽ được thêm sau</p>
            </div>
        ),
        path: "blogs",
    },
];
