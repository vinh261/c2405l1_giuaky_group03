import Button from "@/components/common/button/ButtonCustom";
import { LoadingSpinner } from "@/components/common/loading";
import Pagination from "@/components/common/pagination/Pagination";
import SearchBar from "@/components/common/search/SearchBar";
import MealFormModal from "@/components/meal-page/meal-add-item/MealFormModal";
import MealCard from "@/components/meal-page/meal-card/MealCard";
import { useMealPageLogic } from "@/components/meal-page/useMealPageLogic";
import { cn } from "@/utils/cn";
import { Grid, List, Plus } from "lucide-react";
import { useState } from "react";


const MealManagement = () => {
    const {
        isLoading,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        data,
        resetFilters,
        showCreateModal,
        setShowCreateModal,
        user,
    } = useMealPageLogic();

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="grid gap-4">
            <div className="border border-slate-300 p-6 bg-slate-100 rounded-lg">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý món ăn</h1>
                    <p className="text-gray-600">Quản lý danh sách món ăn trong hệ thống</p>
                </div>

                {/* Filters */}
                <div className="flex gap-3 items-center w-full lg:w-auto">
                    {/* Search */}
                    <SearchBar 
                        placeholder="Tìm kiếm món ăn..."
                        value={searchTerm}
                        onChange={(term) => setSearchTerm(term)}
                        className="flex-1 lg:w-80"
                        inputClassName="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                        autoFocus={false}
                    />

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
                </div>
            </div>

            <div className="mx-auto p-6 bg-slate-100 rounded-lg shadow-sm border border-slate-200">
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
}
export default MealManagement;