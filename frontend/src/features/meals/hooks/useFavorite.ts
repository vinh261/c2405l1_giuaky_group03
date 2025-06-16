import { useEffect, useState } from "react";
import type { Favorite } from "../types/test.type";
import { favoriteService } from "../services/favoriteApi";


export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            setLoading(true);
            const response = await favoriteService.getFavorites();
            if (response.data) {
                setFavorites(response.data);
                setFavoriteIds(
                    response.data.map((fav: Favorite) => fav.meal_id)
                );
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const isFavorite = (mealId: number) => {
        return favoriteIds.includes(mealId);
    };

    const toggleFavorite = async (mealId: number) => {
        try {
            if (isFavorite(mealId)) {
                const favoriteItem = favorites.find(
                    (fav) => fav.meal_id === mealId
                );
                if (favoriteItem) {
                    await favoriteService.removeFromFavorites(favoriteItem.id);
                    setFavorites((prev) =>
                        prev.filter((fav) => fav.id !== favoriteItem.id)
                    );
                    setFavoriteIds((prev) =>
                        prev.filter((id) => id !== mealId)
                    );
                }
            } else {
                const response = await favoriteService.addToFavorites(mealId);
                if (response.data) {
                    setFavorites((prev) => [...prev, response.data]);
                    setFavoriteIds((prev) => [...prev, mealId]);
                }
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return {
        favorites,
        favoriteIds,
        loading,
        isFavorite,
        toggleFavorite,
        refetch: loadFavorites,
    };
};