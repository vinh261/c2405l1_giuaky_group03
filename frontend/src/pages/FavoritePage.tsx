import React from "react";
import { Heart, Search, Filter, Grid, List } from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { cn } from "@/utils/cn";
import MealCard from "@/components/meal-page/meal-card/MealCard";
import { useFavorite } from "@/components/favorite-page/useFavorite";
import Button from "@/components/common/button/ButtonCustom";

const FavoritePage: React.FC = () => {
    const {
        favorites,
        isLoading,
        error,
        filteredFavorites,
        categories,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        viewMode,
        setViewMode,
        navigate,
        user
    } = useFavorite();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Đăng nhập để xem danh sách yêu thích
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Bạn cần đăng nhập để xem các món ăn đã lưu
                    </p>
                    <Button onClick={() => navigate("/login")}>
                        Đăng nhập
                    </Button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <p className="text-red-500 mb-4">
                        Không thể tải danh sách yêu thích
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-20 m-auto">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Danh sách yêu thích
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    {favorites.length} món ăn đã lưu
                                </p>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "p-2 rounded transition-all",
                                    viewMode === "grid"
                                        ? "bg-white shadow-sm"
                                        : "hover:bg-gray-200"
                                )}>
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2 rounded transition-all",
                                    viewMode === "list"
                                        ? "bg-white shadow-sm"
                                        : "hover:bg-gray-200"
                                )}>
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm kiếm trong danh sách yêu thích..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        {categories.length > 1 && (
                            <div className="flex gap-2 items-center">
                                <Filter className="h-5 w-5 text-gray-500" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                                    <option value="all">Tất cả danh mục</option>
                                    {categories
                                        .filter((cat) => cat !== "all")
                                        .map((category) => (
                                            <option
                                                key={category}
                                                value={category}>
                                                {category === "breakfast" &&
                                                    "Bữa sáng"}
                                                {category === "lunch" &&
                                                    "Bữa trưa"}
                                                {category === "dinner" &&
                                                    "Bữa tối"}
                                                {category === "snacks" &&
                                                    "Ăn vặt"}
                                                {category === "smoothies" &&
                                                    "Smoothies"}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : filteredFavorites.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        {favorites.length === 0 ? (
                            <>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Chưa có món ăn yêu thích
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Hãy khám phá và lưu các món ăn bạn thích
                                </p>
                                <Button
                                    onClick={() => navigate("/meal-menu")}>
                                    Khám phá món ăn
                                </Button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Không tìm thấy món ăn
                                </h3>
                                <p className="text-gray-500">
                                    Thử tìm kiếm với từ khóa khác
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-red-500">
                                    {favorites.length}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Tổng món ăn
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-orange-500">
                                    {Math.round(
                                        favorites.reduce(
                                            (sum, meal) => sum + meal.calories,
                                            0
                                        ) / favorites.length
                                    )}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Calories TB
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-green-500">
                                    {
                                        favorites.filter((m) =>
                                            m.diet_type.includes("Vegetarian")
                                        ).length
                                    }
                                </p>
                                <p className="text-sm text-gray-600">
                                    Món chay
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-blue-500">
                                    {
                                        favorites.filter((m) =>
                                            m.diet_type.includes("Gluten-Free")
                                        ).length
                                    }
                                </p>
                                <p className="text-sm text-gray-600">
                                    Không gluten
                                </p>
                            </div>
                        </div>

                        {/* Meals Grid/List */}
                        <div
                            className={cn(
                                "grid gap-6",
                                viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    : "grid-cols-1"
                            )}>
                            {filteredFavorites.map((meal) => (
                                <MealCard
                                    key={meal.meal_id}
                                    meal={meal}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default FavoritePage;
