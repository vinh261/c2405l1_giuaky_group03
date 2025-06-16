import client from "@/services/api/client";
import { useQuery } from "@tanstack/react-query";


interface FavoriteStatsData {
    total_favorites: number;
    total_unique_users: number;
    most_favorited: Array<{
        meal_id: string;
        meal_name: string;
        image: string;
        count: number;
        percentage: number;
    }>;
    recent_favorites: Array<{
        user_name: string;
        meal_name: string;
        created_at: string;
    }>;
}

export const useFavStats = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["admin-favorite-stats"],
        queryFn: async () => {
            const response = await client.get<FavoriteStatsData>(
                "/api/admin/favorites/stats"
            );
            return response.data;
        },
    });

    return {
        stats,
        isLoading,
    }
}