import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import { getFavorites } from "@/services/api/protectedMeal.service";

export const useFavoritesSync = () => {
    const { user } = useAuthStore();
    const { clearFavorites, addFavorite } = useMealStore();

    // Fetch favorites from API
    const { data: favorites } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
        enabled: !!user,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Sync to local store
    useEffect(() => {
        if (favorites && favorites.length > 0) {
            // Clear existing and add from API
            clearFavorites();
            favorites.forEach((meal) => {
                addFavorite(meal.meal_id);
            });
        }
    }, [favorites, clearFavorites, addFavorite]);

    return { favorites };
};
