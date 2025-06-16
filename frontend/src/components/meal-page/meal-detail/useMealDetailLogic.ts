import { mealKeys, useMealDetail } from "@/hooks/react-query/useMealQuery";
import { deleteMeal } from "@/services/api/protectedMeal.service";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import type { DietType } from "@/types/meals.types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";


export const useMealDetailLogic = () => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mealId } = useParams<{ mealId: string }>();
    const { isFavorite, addFavorite, removeFavorite } = useMealStore();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch meal details
    const { data, isLoading, error } = useMealDetail(mealId || "");

    const meal = data?.data;
    const isFav = meal ? isFavorite(meal.meal_id) : false;

    // Check if user can edit/delete
    const canEdit = meal && user && (
        user.profile?.role === 'admin' || 
        meal.recipe?.created_by === user.user_id
    );

    const handleDelete = async () => {
        if (!meal) return;
        
        try {
            setIsDeleting(true);
            await deleteMeal(meal.meal_id);
            toast.success("Đã xóa món ăn thành công");
            
            // Invalidate queries
            queryClient.invalidateQueries({ queryKey: mealKeys.all });
            
            // Close modal and navigate back
            handleClose();
        } catch {
            toast.error("Xóa món ăn thất bại. Vui lòng thử lại sau.");
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    // Close modal on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                navigate(-1);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden"; // Prevent background scroll

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [navigate]);

    const handleFavoriteClick = () => {
        if (!meal) return;

        if (isFav) {
            removeFavorite(meal.meal_id);
            toast.error("Đã xóa khỏi danh sách yêu thích");
        } else {
            addFavorite(meal.meal_id);
            toast.success("Đã thêm vào danh sách yêu thích");
        }
    };

    const handleShare = async () => {
        if (!meal) return;

        try {
            await navigator.share({
                title: meal.meal_name,
                text: meal.desc,
                url: window.location.href,
            });
        } catch {
            // Copy to clipboard as fallback
            navigator.clipboard.writeText(window.location.href);
            toast.success("Đã sao chép liên kết vào clipboard");
        }
    };

    const handleTagClick = (tagName: string) => {
        // Set filter với diet type
        const { setFilters, setActiveCategory } = useMealStore.getState();
        
        // Close modal
        handleClose();
        
        // Navigate to meals page với filter
        navigate('/meal-menu');
        
        // Apply filter sau khi navigate
        setTimeout(() => {
            setActiveCategory('all'); // Reset category
            setFilters({ 
                diet_type: [tagName as DietType],
                page: 1 
            });
            toast.success(`Đang lọc theo chế độ ăn: ${tagName}`);
        }, 100);
    };

    const handlePrint = () => {
        window.print();
    };

    const getDietBadgeColor = (diet: string) => {
        const colors: Record<string, string> = {
            Vegan: "bg-green-100 text-green-800",
            Vegetarian: "bg-emerald-100 text-emerald-800",
            Keto: "bg-purple-100 text-purple-800",
            Paleo: "bg-orange-100 text-orange-800",
            "Gluten-Free": "bg-blue-100 text-blue-800",
            "Low Carb": "bg-yellow-100 text-yellow-800",
            "High Protein": "bg-red-100 text-red-800",
        };
        return colors[diet] || "bg-gray-100 text-gray-800";
    };

    return {
        meal,
        isLoading,
        error,
        isFav,
        handleFavoriteClick,
        handleShare,
        handlePrint,
        getDietBadgeColor,
        handleClose,
        navigate,
        handleTagClick,
        canEdit,
        showEditModal,
        setShowEditModal,
        setShowDeleteConfirm,
        showDeleteConfirm,
        isDeleting,
        handleDelete,
    };
};
