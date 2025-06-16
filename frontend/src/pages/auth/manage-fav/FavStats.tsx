import React from "react";
import { Heart, TrendingUp, Users } from "lucide-react";
import { useFavStats } from "./useFavStats";
import { LoadingSpinner } from "@/components/common/loading";


const FavoriteStats: React.FC = () => {
    const result = useFavStats();
    const { stats } = result;
    
    // Type guard to ensure we have the expected object structure
    if (!result || typeof result !== 'object' || !('stats' in result)) {
        return (
            <div className="flex justify-center items-center h-96">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">
                                Tổng lượt yêu thích
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {stats?.total_favorites || 0}
                            </p>
                        </div>
                        <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">
                                Người dùng có favorites
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {stats?.total_unique_users || 0}
                            </p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">
                                TB mỗi người
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {stats?.total_unique_users
                                    ? (
                                          stats.total_favorites /
                                          stats.total_unique_users
                                      ).toFixed(1)
                                    : "0"}
                            </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Most Favorited Meals */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                    Top món được yêu thích nhất
                </h3>
                <div className="space-y-4">
                    {stats?.most_favorited.map((meal, index) => (
                        <div
                            key={meal.meal_id}
                            className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-bold text-sm">
                                {index + 1}
                            </div>
                            <img
                                src={
                                    meal.image ||
                                    "https://via.placeholder.com/50"
                                }
                                alt={meal.meal_name}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                    {meal.meal_name}
                                </h4>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-sm text-gray-500">
                                        {meal.count} lượt thích
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-red-500 h-2 rounded-full"
                                            style={{
                                                width: `${meal.percentage}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {meal.percentage}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Favorites */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                    Hoạt động gần đây
                </h3>
                <div className="space-y-3">
                    {stats?.recent_favorites.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b last:border-0">
                            <div className="flex items-center gap-3">
                                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                                <div>
                                    <span className="font-medium">
                                        {activity.user_name}
                                    </span>
                                    <span className="text-gray-600">
                                        {" "}
                                        đã thích{" "}
                                    </span>
                                    <span className="font-medium">
                                        {activity.meal_name}
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(
                                    activity.created_at
                                ).toLocaleDateString("vi-VN")}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default FavoriteStats;
