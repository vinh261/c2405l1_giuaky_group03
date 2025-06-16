import React from "react";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ButtonCustom from "@/components/common/button/ButtonCustom";
import { useCategoryManage } from "@/pages/auth/manage-category/useCategoryManage";


const CategoryManagement: React.FC = () => {
    const {
        categories,
        isLoading,
        showForm,
        setShowForm,
        editingCategory,
        setEditingCategory,
        categoryName,
        setCategoryName,
        handleSubmit,
        handleEdit,
        handleDelete,
        createCategoryMutation,
        updateCategoryMutation,
        categoryDisplayNames
    } = useCategoryManage();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Quản lý danh mục</h2>
                    <ButtonCustom onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm danh mục
                    </ButtonCustom>
                </div>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">
                        {editingCategory
                            ? "Chỉnh sửa danh mục"
                            : "Thêm danh mục mới"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên danh mục
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Nhập tên danh mục..."
                            />
                        </div>
                        <div className="flex gap-2">
                            <ButtonCustom
                                type="submit"
                                disabled={
                                    createCategoryMutation.isPending ||
                                    updateCategoryMutation.isPending
                                }>
                                {editingCategory ? "Cập nhật" : "Tạo mới"}
                            </ButtonCustom>
                            <ButtonCustom
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingCategory(null);
                                    setCategoryName("");
                                }}>
                                Hủy
                            </ButtonCustom>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-12">
                        <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Chưa có danh mục nào</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên danh mục
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Số món ăn
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày tạo
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr
                                        key={category.category_id}
                                        className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {categoryDisplayNames[
                                                    category.category_name
                                                ] || category.category_name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {category.category_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {category.meals_count} món
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(
                                                category.created_at
                                            ).toLocaleDateString("vi-VN")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Chỉnh sửa">
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.category_id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Xóa"
                                                    disabled={
                                                        category.meals_count > 0
                                                    }>
                                                    <Trash2
                                                        className={`h-5 w-5 ${
                                                            category.meals_count >
                                                            0
                                                                ? "opacity-50 cursor-not-allowed"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CategoryManagement;
