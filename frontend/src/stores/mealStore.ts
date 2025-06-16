import type { MealCategory, MealFilterParams, MealStore } from "@/types/meals.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const initialFilters: MealFilterParams = {
    category: undefined,
    diet_type: [],
    min_calories: undefined,
    max_calories: undefined,
    search: undefined,
    page: 1,
    per_page: 12,
};

export const useMealStore = create<MealStore>()(
    persist(
        (set, get) => ({
            // Favorites
            favorites: [],

            addFavorite: (meal_id: string) => {
                const { favorites } = get();
                if (!favorites.find((f) => f.meal_id === meal_id)) {
                    set({
                        favorites: [
                            ...favorites,
                            { meal_id, added_at: new Date().toISOString() },
                        ],
                    });
                }
            },

            removeFavorite: (meal_id: string) => {
                set({
                    favorites: get().favorites.filter(
                        (f) => f.meal_id !== meal_id
                    ),
                });
            },

            isFavorite: (meal_id: string) => {
                return get().favorites.some((f) => f.meal_id === meal_id);
            },

            clearFavorites: () => {
                set({ favorites: [] });
            },

            getFavoritesCount: () => {
                return get().favorites.length;
            },

            // Filters
            filters: initialFilters,

            setFilters: (newFilters: Partial<MealFilterParams>) => {
                set({
                    filters: {
                        ...get().filters,
                        ...newFilters,
                        page: newFilters.page || 1, // Reset page when filters change
                    },
                });
            },

            resetFilters: () => {
                set({
                    filters: initialFilters,
                    searchTerm: "",
                    activeCategory: "all",
                });
            },

            // Category
            activeCategory: "all",

            setActiveCategory: (category: MealCategory | "all") => {
                set({
                    activeCategory: category,
                    filters: {
                        ...get().filters,
                        category: category === "all" ? undefined : category,
                        page: 1,
                    },
                });
            },

            // Search
            searchTerm: "",

            setSearchTerm: (term: string) => {
                set({
                    searchTerm: term,
                    filters: {
                        ...get().filters,
                        search: term || undefined,
                        page: 1,
                    },
                });
            },

            // View preferences
            viewMode: "grid",

            setViewMode: (mode: "grid" | "list") => {
                set({ viewMode: mode });
            },

            // Recent searches
            recentSearches: [],

            addRecentSearch: (term: string) => {
                const { recentSearches } = get();
                const filtered = recentSearches.filter((s) => s !== term);
                set({
                    recentSearches: [term, ...filtered].slice(0, 5), // Keep only 5 recent
                });
            },

            clearRecentSearches: () => {
                set({ recentSearches: [] });
            },
        }),
        {
            name: "meal-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                favorites: state.favorites,
                viewMode: state.viewMode,
                recentSearches: state.recentSearches,
            }),
        }
    )
);
