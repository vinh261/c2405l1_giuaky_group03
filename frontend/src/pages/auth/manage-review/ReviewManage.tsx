import React from "react";
import { Star, MessageSquare, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ButtonCustom from "@/components/common/button/ButtonCustom";
import { useManageReview } from "./useManageReview";


const ReviewManagement: React.FC = () => {
    const {
        reviews,
        averageRating,
        unrepliedCount,
        isLoading,
        replyingTo,
        setReplyingTo,
        replyText,
        setReplyText,
        handleReply,
        handleDelete,
        renderStars,
        replyMutation,
    } = useManageReview();

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">
                                Tổng đánh giá
                            </p>
                            <p className="text-2xl font-bold">
                                {reviews.length}
                            </p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đánh giá TB</p>
                            <p className="text-2xl font-bold">
                                {averageRating.toFixed(1)}
                            </p>
                        </div>
                        <div className="flex text-yellow-400">
                            {renderStars(Math.round(averageRating))}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">
                                Chưa phản hồi
                            </p>
                            <p className="text-2xl font-bold">
                                {unrepliedCount}
                            </p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white rounded-lg shadow-sm">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Chưa có đánh giá nào</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-medium text-gray-900">
                                                {review.user_name}
                                            </h4>
                                            {renderStars(review.rating)}
                                            <span className="text-sm text-gray-500">
                                                {new Date(
                                                    review.created_at
                                                ).toLocaleDateString("vi-VN")}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            {review.comment}
                                        </p>

                                        {/* Admin Reply */}
                                        {review.admin_reply && (
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <p className="text-sm font-medium text-gray-700 mb-1">
                                                    Phản hồi:
                                                </p>
                                                <p className="text-gray-600">
                                                    {review.admin_reply}
                                                </p>
                                                {review.admin_reply_at && (
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {new Date(
                                                            review.admin_reply_at
                                                        ).toLocaleDateString(
                                                            "vi-VN"
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Reply Form */}
                                        {!review.admin_reply && (
                                            <>
                                                {replyingTo === review.id ? (
                                                    <div className="mt-4">
                                                        <textarea
                                                            value={replyText}
                                                            onChange={(e) =>
                                                                setReplyText(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            rows={3}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                                                            placeholder="Nhập phản hồi..."
                                                        />
                                                        <div className="flex gap-2">
                                                            <ButtonCustom
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleReply(
                                                                        review.id
                                                                    )
                                                                }
                                                                disabled={
                                                                    replyMutation.isPending
                                                                }>
                                                                Gửi
                                                            </ButtonCustom>
                                                            <ButtonCustom
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setReplyingTo(
                                                                        null
                                                                    );
                                                                    setReplyText(
                                                                        ""
                                                                    );
                                                                }}>
                                                                Hủy
                                                            </ButtonCustom>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <ButtonCustom
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setReplyingTo(
                                                                review.id
                                                            )
                                                        }>
                                                        Phản hồi
                                                    </ButtonCustom>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="ml-4 text-red-600 hover:text-red-900"
                                        title="Xóa đánh giá">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default ReviewManagement;
