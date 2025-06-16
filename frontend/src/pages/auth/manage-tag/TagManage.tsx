import React from "react";
import { Plus, Tag } from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ButtonCustom from "@/components/common/button/ButtonCustom";
import { useTagManage } from "./useTagManage";


const TagManagement: React.FC = () => {
    const {
        tags,
        isLoading,
        showForm,
        setShowForm,
        tagName,
        setTagName,
        createTagMutation
    } = useTagManage();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Quản lý Tags</h2>
                    <ButtonCustom onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm tag
                    </ButtonCustom>
                </div>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (tagName.trim())
                                createTagMutation.mutate(tagName);
                        }}
                        className="space-y-4">
                        <input
                            type="text"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Nhập tên tag..."
                        />
                        <div className="flex gap-2">
                            <ButtonCustom type="submit">Tạo mới</ButtonCustom>
                            <ButtonCustom
                                variant="outline"
                                onClick={() => setShowForm(false)}>
                                Hủy
                            </ButtonCustom>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                        {tags.map((tag) => (
                            <div
                                key={tag.tag_id}
                                className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Tag className="h-5 w-5 text-gray-500" />
                                    <span className="text-xs text-gray-500">
                                        {tag.meals_count} món
                                    </span>
                                </div>
                                <p className="font-medium text-gray-900">
                                    {tag.tag_name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default TagManagement;
