import client from "@/services/api/client";
import type { DashboardStatsData } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { Heart, Star, Users, UtensilsCrossed } from "lucide-react";


export const useCardStats = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: async () => {
            const response = await client.get<DashboardStatsData>('/api/admin/dashboard-stats');
            return response.data;
        }
    });

    const statCards = [
        {
            title: "Tổng người dùng",
            value: stats?.users.total || 0,
            change: stats?.users.growth || 0,
            icon: <Users className="h-8 w-8 text-blue-600" />,
            bgColor: "bg-blue-50",
            subtext: `+${stats?.users.new_this_month || 0} thành viên mới tháng này`,
            subtitle: "Thành viên",
        },
        {
            title: "Tổng món ăn",
            value: stats?.meals.total || 0,
            change: 0,
            icon: <UtensilsCrossed className="h-8 w-8 text-green-600" />,
            bgColor: "bg-green-50",
            subtext: "Đang phục vụ",
            subtitle: "Món ăn",
        },
        {
            title: "Lượt yêu thích",
            value: stats?.favorites.total || 0,
            change: 0,
            icon: <Heart className="h-8 w-8 text-red-600" />,
            bgColor: "bg-red-50",
            subtext: "Trong tháng này",
            subtitle: "Lượt yêu thích",
        },
        {
            title: "Đánh giá",
            value: stats?.reviews.average_rating?.toFixed(1) || "0.0",
            change: 0,
            icon: <Star className="h-8 w-8 text-yellow-600" />,
            bgColor: "bg-yellow-50",
            subtext: `Đã có ${stats?.reviews.total || 0} đánh giá`,
            subtitle: "Đánh giá trung bình",
        },
    ];

    return {
        stats,
        statCards,
        isLoading,
    }
}