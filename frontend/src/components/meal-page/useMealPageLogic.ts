import { useMeals } from "@/hooks/react-query/useMealQuery";
import useClickOutSide from "@/hooks/useClickOutSide";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import type { DietType, MealCategory } from "@/types/meals.types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";


const categories: { value: MealCategory | "all"; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "breakfast", label: "Bữa sáng" },
    { value: "lunch", label: "Bữa trưa" },
    { value: "dinner", label: "Bữa tối" },
    { value: "snacks", label: "Ăn kiêng" },
    { value: "smoothies", label: "Smoothies" },
];

const dietTypes: { value: DietType; label: string }[] = [
    { value: "Vegan", label: "Thuần chay" },
    { value: "Vegetarian", label: "Chay" },
    { value: "Keto", label: "Keto" },
    { value: "Paleo", label: "Paleo" },
    { value: "Gluten-Free", label: "Không Gluten" },
    { value: "Low Carb", label: "Ít béo" },
    { value: "High Protein", label: "Giàu protein" },
];

export const useMealPageLogic = () => {
    const { user } = useAuthStore();
    const [ searchParams ] = useSearchParams();
    const [showCalc, setShowCalc] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const ref = useRef(null);
    const filterButtonRef = useRef(null);
    const refCalc = useRef(null);

    const {
        filters,
        setFilters,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        resetFilters,
    } = useMealStore();

    // Get meals data
    const { data, isLoading, error } = useMeals(filters);

    // Click outside để đóng dropdown (exclude button và dropdown)
    useClickOutSide([filterButtonRef, ref], () => {
        setShowFilters(false);
    });
    useClickOutSide([refCalc], () => setShowCalc(false));

    const handleOpenCalc = () => {
        setShowCalc(!showCalc);
    };

    // Initialize from URL params
    useEffect(() => {
        const category = searchParams.get("category");
        if (category) {
            setActiveCategory(category as MealCategory);
        }
    }, [ searchParams, setActiveCategory ]);

    // Handle page change
    const handlePageChange = (page: number) => {
        setFilters({ page });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Handle diet type toggle
    const handleDietTypeToggle = (diet: DietType) => {
        const currentDietTypes = filters.diet_type || [];
        const newDietTypes = currentDietTypes.includes(diet)
            ? currentDietTypes.filter((d) => d !== diet)
            : [...currentDietTypes, diet];

        setFilters({ diet_type: newDietTypes });
    };

    // Handle calorie range
    const handleCalorieRange = (min?: number, max?: number) => {
        setFilters({ min_calories: min, max_calories: max });
    };

    return {
        filters,
        setFilters,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        resetFilters,
        data,
        isLoading,
        error,
        showFilters,
        handleOpenCalc,
        handlePageChange,
        handleDietTypeToggle,
        handleCalorieRange,
        filterButtonRef,
        ref,
        refCalc,
        showCalc,
        setShowFilters,
        categories,
        dietTypes,
        user,
        setShowCreateModal,
        showCreateModal,
    };
}