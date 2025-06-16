import React from "react"
import { useCardStats } from "./useCardStats"
import { Heart } from "lucide-react"


export const StatsOther = () => {
    const { stats } = useCardStats()
    
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Meals by Category */}
                <div className="bg-white border border-slate-300 transition-colors duration-300 dark:border-slate-700 dark:bg-[#151b23] dark:text-slate-300 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Món ăn theo danh mục
                    </h3>
                    <div className="space-y-3">
                        {stats?.meals.by_category &&
                            Object.entries(stats.meals.by_category).map(
                                ([category, count]) => (
                                    <div
                                        key={category}
                                        className="flex items-center justify-between">
                                        <span className=" capitalize font-medium">
                                            {category}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{
                                                        width: `${
                                                            (count /
                                                                stats.meals
                                                                    .total) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="w-12 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                </div>

                {/* Most Favorited Meals */}
                <div className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-[#151b23] dark:text-slate-300">
                    <h3 className="text-lg font-semibold mb-4">
                        Món được yêu thích nhất
                    </h3>
                    <div className="space-y-3">
                        {stats?.favorites.most_favorited
                            ?.slice(0, 5)
                            .map((meal, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between">
                                    <span className="truncate flex-1 mr-3">
                                        {meal.meal_name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                                        <span className="text-sm font-medium">
                                            {meal.count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-300 transition-colors duration-300 dark:border-slate-700 dark:bg-[#151b23] dark:text-slate-300 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                    Hoạt động gần đây
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                        <span className="">Đánh giá mới</span>
                        <span className="font-medium">
                            {stats?.reviews.recent_count || 0} trong 7 ngày qua
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <span className="">Người dùng mới</span>
                        <span className="font-medium">
                            {stats?.users.new_this_month || 0} tháng này
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}