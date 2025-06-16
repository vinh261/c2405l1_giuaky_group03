import { Calculator, Filter, Grid, List, Plus, Search, X } from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { cn } from "@/utils/cn";
import Button from "@/components/common/button/ButtonCustom";
import MealCard from "@/components/meal-page/meal-card/MealCard";
import NutritionCalculator from "@/components/meal-page/nutrition-calc/NutritionCalculator";
import { useMealPageLogic } from "@/components/meal-page/useMealPageLogic";
import Pagination from "@/components/common/pagination/Pagination";
import MealFormModal from "@/components/meal-page/meal-add-item/MealFormModal";


const MealPage = () => {
    const {
        error,
        user,
        data,
        isLoading,
        filters,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        resetFilters,
        handleOpenCalc,
        handleDietTypeToggle,
        handleCalorieRange,
        showFilters,
        filterButtonRef,
        ref,
        refCalc,
        showCalc,
        setShowFilters,
        categories,
        dietTypes,
        setShowCreateModal,
        showCreateModal,
    } = useMealPageLogic();

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">
                        Đã có lỗi xảy ra khi tải dữ liệu
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container grid gap-4 m-auto my-20">
            {/* Header */}
            <div className="bg-slate-50 shadow-sm z-40 rounded-lg">
                <div className="bg-[url(/src/assets/images/menu/banner_menu.png)] w-full h-40 bg-cover bg-center rounded-tl-lg rounded-tr-lg"></div>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Title & Results */}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Healthy Việt Nam
                            </h1>
                            {data && (
                                <p className="text-sm text-gray-600 mt-1">
                                    Tìm thấy {data.total} công thức
                                </p>
                            )}
                        </div>

                        {/* Search & Controls */}
                        <div className="flex gap-3 items-center w-full lg:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 lg:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Tìm kiếm món ăn..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                />
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex bg-slate-300 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cn(
                                        "p-2 rounded",
                                        viewMode === "grid"
                                            ? "bg-white shadow-sm"
                                            : ""
                                    )}>
                                    <Grid className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn(
                                        "p-2 rounded",
                                        viewMode === "list"
                                            ? "bg-white shadow-sm"
                                            : ""
                                    )}>
                                    <List className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Filter Toggle */}
                            <Button
                                ref={filterButtonRef}
                                onClick={() => setShowFilters(!showFilters)}
                                className={cn("relative border border-slate-300 transition-colors hover:bg-slate-200",
                                    showFilters ? "bg-slate-300" : ""
                                )}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Lọc
                                {(filters.diet_type?.length ||
                                    filters.min_calories ||
                                    filters.max_calories) && (
                                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {(filters.diet_type?.length || 0) +
                                            (filters.min_calories ? 1 : 0)}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 justify-between items-center mt-4 overflow-x-auto pb-2">
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <Button
                                    key={cat.value}
                                    size="sm"
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={cn("whitespace-nowrap border border-slate-300",
                                        activeCategory === cat.value
                                            ? "bg-slate-300 text-slate-900 border-slate-400"
                                            : "text-gray-600 hover:bg-slate-200"
                                    )}>
                                    {cat.label}
                                </Button>
                            ))}
                        </div>

                        <div className="flex gap-2 items-center">
                            <Button
                                onClick={handleOpenCalc}
                                className="border border-slate-300 transition-colors hover:bg-slate-200 flex items-center justify-self-end"
                            >
                                <Calculator />
                                Tính toán dinh dưỡng
                            </Button>
                            {showCalc && (
                                <div className="fixed bg-black/50 inset-0 z-10">
                                    <div ref={refCalc} className="fixed top-1/2 left-1/2 -translate-1/2 z-9 px-4 py-6 bg-slate-100 border border-slate-300 rounded-xl">
                                        <NutritionCalculator />
                                        <X onClick={handleOpenCalc} className="absolute right-1 top-1 border border-slate-300 transition-colors duration-300 cursor-pointer hover:bg-slate-300 rounded-full p-1" />
                                    </div>
                                </div>
                            )}

                            {/* Create Button - Only for logged in users */}
                            {user && (
                                <Button
                                    onClick={() => setShowCreateModal(true)}
                                    className="flex items-center gap-2 border border-slate-300 transition-colors hover:bg-slate-200"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="hidden sm:inline">Thêm món mới</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div 
                    ref={ref} 
                    className="bg-slate-50 shadow-sm -mt-1 border border-slate-200 rounded-lg"
                >
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Bộ lọc</h3>
                            <Button
                                size="sm"
                                onClick={resetFilters}
                                className="border border-slate-300 transition-colors hover:bg-slate-200"
                            >
                                Xóa tất cả
                            </Button>
                        </div>

                        {/* Diet Types */}
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Loại chế độ ăn
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {dietTypes.map((diet) => (
                                    <button
                                        key={diet.value}
                                        onClick={() =>
                                            handleDietTypeToggle(diet.value)
                                        }
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition-colors border border-slate-200",
                                            filters.diet_type?.includes(
                                                diet.value
                                            )
                                                ? "bg-green-600 text-slate-100"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                                        )}>
                                        {diet.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calorie Ranges */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Lượng calories
                            </p>
                            <div className="flex gap-2 justify-between items-center">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() =>
                                            handleCalorieRange(undefined, undefined)
                                        }
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition-colors border border-slate-200",
                                            !filters.min_calories &&
                                                !filters.max_calories
                                                ? "bg-green-600 text-slate-100"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}>
                                        Tất cả
                                    </button>
                                    <button
                                        onClick={() => handleCalorieRange(0, 200)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition-colors border border-slate-200",
                                            filters.min_calories === 0 &&
                                                filters.max_calories === 200
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}>
                                        Dưới 200
                                    </button>
                                    <button
                                        onClick={() => handleCalorieRange(200, 400)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition-colors border border-slate-200",
                                            filters.min_calories === 200 &&
                                                filters.max_calories === 400
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}>
                                        200-400
                                    </button>
                                    <button
                                        onClick={() => handleCalorieRange(400, 600)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition-colors border border-slate-200",
                                            filters.min_calories === 400 &&
                                                filters.max_calories === 600
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}>
                                        400-600
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleCalorieRange(600, undefined)
                                        }
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition-colors border border-slate-200",
                                            filters.min_calories === 600 &&
                                                !filters.max_calories
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}>
                                        Trên 600
                                    </button>
                                </div>

                                <div className="flex justify-self-end gap-2">
                                    <Button 
                                        onClick={() => setShowFilters(false)} 
                                        className="text-slate-100 bg-cyan-600 hover:bg-cyan-500"
                                    >
                                        Áp dụng
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            resetFilters();
                                            setShowFilters(false);
                                        }} 
                                        className="text-slate-700 bg-gray-200 hover:bg-gray-300"
                                    >
                                        Hủy bỏ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto p-6 bg-slate-100 rounded-lg shadow-sm border border-slate-200">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : data && data.data.length > 0 ? (
                    <>
                        <div
                            className={cn(
                                "grid gap-6",
                                viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    : "grid-cols-2"
                            )}>
                            {data.data.map((meal) => (
                                <MealCard
                                    key={meal.meal_id}
                                    meal={meal}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">
                            Không tìm thấy món ăn nào
                        </p>
                        <Button onClick={resetFilters}>
                            Xóa tìm kiếm
                        </Button>
                    </div>
                )}
            </div>

            {/* Create Meal Modal */}
            <MealFormModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                meal={null}
                mode="create"
            />
        </div>
    );
};
export default MealPage;
