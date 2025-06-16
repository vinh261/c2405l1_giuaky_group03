import React from "react";
import { Star, Send } from "lucide-react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { cn } from "@/utils/cn";
import Button from "@/components/common/button/ButtonCustom";
import { useReview } from "@/components/review-page/useReview";
import { Link } from "react-router";


const ReviewPage: React.FC = () => {
    const {
        user,
        reviews,
        isLoading,
        rating,
        setRating,
        comment,
        setComment,
        replyingTo,
        setReplyingTo,
        replyText,
        setReplyText,
        handleSubmitReview,
        handleReply,
        submitReviewMutation,
        replyMutation
    } = useReview();

    const renderStars = (
        currentRating: number,
        interactive = false,
        size = "normal"
    ) => {
        const starSize = size === "small" ? "h-4 w-4" : "h-6 w-6";

        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => interactive && setRating(star)}
                        disabled={!interactive}
                        className={cn(
                            "transition-colors",
                            interactive && "hover:scale-110",
                            !interactive && "cursor-default"
                        )}>
                        <Star
                            className={cn(
                                starSize,
                                star <= currentRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            )}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <section className="container my-20 mx-auto">
            <div className="bg-[url(@/assets/images/review-banner.jpg)] h-40 bg-cover bg-center mb-6 rounded-xl" />
            <h1 className="text-3xl font-bold mb-8">Đánh giá từ khách hàng</h1>

            {/* Review Form */}
            {user ? (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Viết đánh giá của bạn
                    </h2>
                    <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đánh giá
                            </label>
                            {renderStars(rating, true)}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nhận xét
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="Chia sẻ trải nghiệm của bạn..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={submitReviewMutation.isPending}>
                            {submitReviewMutation.isPending ? (
                                <>
                                    <LoadingSpinner className="h-4 w-4 mr-2" />
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Gửi đánh giá
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <p className="text-gray-700">
                        Bạn cần đăng nhập để gửi đánh giá.{" "}
                        <Link
                            to="/login"
                            className="text-green-500 hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500">Chưa có đánh giá nào</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {review.user_name}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        {renderStars(
                                            review.rating,
                                            false,
                                            "small"
                                        )}
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString("vi-VN")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">
                                {review.comment}
                            </p>

                            {/* Admin Reply */}
                            {review.admin_reply && (
                                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                        Phản hồi từ admin:
                                    </p>
                                    <p className="text-gray-600">
                                        {review.admin_reply}
                                    </p>
                                    {review.admin_reply_at && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(
                                                review.admin_reply_at
                                            ).toLocaleDateString("vi-VN")}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Admin Reply Form */}
                            {user?.profile?.role === "admin" && !review.admin_reply && (
                                <>
                                    {replyingTo === review.id ? (
                                        <div className="mt-4">
                                            <textarea
                                                value={replyText}
                                                onChange={(e) =>
                                                    setReplyText(e.target.value)
                                                }
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-2"
                                                placeholder="Nhập phản hồi..."
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleReply(review.id)
                                                    }
                                                    disabled={
                                                        replyMutation.isPending
                                                    }>
                                                    Gửi
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setReplyingTo(null);
                                                        setReplyText("");
                                                    }}>
                                                    Hủy
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                setReplyingTo(review.id)
                                            }
                                            className="mt-4">
                                            Phản hồi
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
export default ReviewPage;
