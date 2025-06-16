import { getFavorites } from "@/services/api/protectedMeal.service";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export const useFavorite = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { viewMode, setViewMode } = useMealStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Fetch favorites
    const {
        data: favorites = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
        enabled: !!user,
        // refetchInterval: 5000, // Refetch every 5 seconds
        refetchIntervalInBackground: false,
    });

    useEffect(() => {
        const handleFocus = () => refetch();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [refetch]);

    // Filter favorites based on search and category
    const filteredFavorites = favorites.filter((meal) => {
        const matchesSearch =
            meal.meal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meal.desc?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || meal.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories from favorites
    const categories = [
        "all",
        ...new Set(favorites.map((meal) => meal.category)),
    ];

    return {
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        viewMode,
        setViewMode,
        navigate,
        user,
        filteredFavorites,
        favorites,
    }
}