import client from "@/services/api/client";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useReview = () => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");

    // Fetch reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const response = await client.get<Review[]>("/api/reviews");
            return response.data;
        },
    });

    // Submit review mutation
    const submitReviewMutation = useMutation({
        mutationFn: async (data: { rating: number; comment: string }) => {
            const response = await client.post("/api/user/reviews", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success("Cảm ơn bạn đã gửi đánh giá!");
            setRating(5);
            setComment("");
        },
        onError: () => {
            toast.error("Không thể gửi đánh giá, vui lòng thử lại.");
        },
    });

    // Admin reply mutation
    const replyMutation = useMutation({
        mutationFn: async ({
            reviewId,
            reply,
        }: {
            reviewId: string;
            reply: string;
        }) => {
            const response = await client.post(
                `/api/reviews/${reviewId}/reply`,
                { reply }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success("Phản hồi đã được gửi!");
            setReplyingTo(null);
            setReplyText("");
        },
        onError: () => {
            toast.error("Không thể gửi phản hồi, vui lòng thử lại.");
        },
    });

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast.error("Vui lòng nhập nhận xét");
            return;
        }
        submitReviewMutation.mutate({ rating, comment });
    };

    const handleReply = (reviewId: string) => {
        if (!replyText.trim()) {
            toast.error("Vui lòng nhập phản hồi");
            return;
        }
        replyMutation.mutate({ reviewId, reply: replyText });
    };

    return {
        reviews,
        isLoading,
        rating,
        handleReply,
        setRating,
        comment,
        setComment,
        replyingTo,
        setReplyingTo,
        replyText,
        setReplyText,
        user,
        handleSubmitReview,
        submitReviewMutation,
        replyMutation,
    }
}