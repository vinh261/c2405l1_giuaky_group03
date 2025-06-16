import client from "@/services/api/client";
import { cn } from "@/utils/cn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface Review {
    id: string;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
    admin_reply?: string;
    admin_reply_at?: string;
}

export const useManageReview = () => {
    const queryClient = useQueryClient();
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");

    // Fetch reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["admin-reviews"],
        queryFn: async () => {
            const response = await client.get<Review[]>("/api/reviews");
            return response.data;
        },
    });

    // Reply mutation
    const replyMutation = useMutation({
        mutationFn: async ({
            reviewId,
            reply,
        }: {
            reviewId: string;
            reply: string;
        }) => {
            return client.post(`/api/reviews/${reviewId}/reply`, { reply });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
            toast.success("Đã gửi phản hồi");
            setReplyingTo(null);
            setReplyText("");
        },
        onError: () => {
            toast.error("Không thể gửi phản hồi");
        },
    });

    // Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: async (reviewId: string) => {
            return client.delete(`/api/admin/reviews/${reviewId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
            toast.success("Đánh giá đã được xóa");
        },
        onError: () => {
            toast.error("Không thể xóa đánh giá");
        },
    });

    const handleReply = (reviewId: string) => {
        if (!replyText.trim()) return;
        replyMutation.mutate({ reviewId, reply: replyText });
    };

    const handleDelete = (reviewId: string) => {
        if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
            deleteReviewMutation.mutate(reviewId);
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={cn(
                            "h-4 w-4",
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        )}
                    />
                ))}
            </div>
        );
    };

    // Stats
    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
    const unrepliedCount = reviews.filter((r) => !r.admin_reply).length;

    return {
        reviews,
        isLoading,
        replyingTo,
        setReplyingTo,
        replyText,
        setReplyText,
        handleReply,
        handleDelete,
        replyMutation,
        deleteReviewMutation,
        renderStars,
        averageRating,
        unrepliedCount,
    }
}