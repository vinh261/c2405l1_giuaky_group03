import type { NutritionIngredient, NutritionTotals, SelectedIngredient } from "@/types/nutrition.types";
import { useEffect, useMemo, useRef, useState } from "react";
import nutritionData from "@/data/nutrition.json";
import { calculateNutrition } from "@/services/nutritionCalc.service";
import toast from "react-hot-toast";
import useClickOutSide from "@/hooks/useClickOutSide";


export const useNutritionLogic = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState<
        SelectedIngredient[]
    >([]);
    const [filteredIngredients, setFilteredIngredients] = useState<
        NutritionIngredient[]
    >([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useRef(null);
    const [totals, setTotals] = useState<NutritionTotals>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
    });

    // Load nutrition data
    const ingredients: NutritionIngredient[] = useMemo(() => 
        nutritionData.ingredients || []
    , []);

    // Filter ingredients based on search
    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = ingredients.filter((ingredient) =>
                ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredIngredients(filtered);
            setShowDropdown(true);
        } else {
            setFilteredIngredients([]);
            setShowDropdown(false);
        }
    }, [searchTerm, ingredients]);

    // Calculate totals when ingredients change
    useEffect(() => {
        const newTotals = calculateNutrition(selectedIngredients);
        setTotals(newTotals);
    }, [selectedIngredients]);

    useClickOutSide([ref], () => setShowDropdown(false));

    const handleAddIngredient = (ingredient: NutritionIngredient) => {
        const existingIndex = selectedIngredients.findIndex(
            (item) => item.id === ingredient.id
        );

        if (existingIndex !== -1) {
            // Update quantity if ingredient already exists
            const updated = [...selectedIngredients];
            updated[existingIndex].quantity += 1;
            setSelectedIngredients(updated);
            toast.dismiss(); // Clear existing toasts
            toast.success("Số lượng nguyên liệu đã được cập nhật");
        } else {
            // Add new ingredient
            setSelectedIngredients([
                ...selectedIngredients,
                {
                    ...ingredient,
                    quantity: 1,
                },
            ]);
            toast.dismiss(); // Clear existing toasts
            toast.success("Đã thêm nguyên liệu");
        }

        setSearchTerm("");
        setShowDropdown(false);
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity <= 0) {
            toast.error("Số lượng phải lớn hơn 0");
            return;
        }

        setSelectedIngredients(
            selectedIngredients.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const handleRemoveIngredient = (id: string) => {
        setSelectedIngredients(
            selectedIngredients.filter((item) => item.id !== id)
        );
        toast.dismiss(); // Clear existing toasts
        toast.error("Nguyên liệu đã được xóa");
    };

    const handleClearAll = () => {
        setSelectedIngredients([]);
        toast.dismiss(); // Clear existing toasts
        toast.error("Đã xóa tất cả nguyên liệu");
    };

    // const getNutrientPercentage = (
    //     value: number,
    //     dailyValue: number
    // ): number => {
    //     return Math.round((value / dailyValue) * 100);
    // };
    
    return {
        ref,
        searchTerm,
        setSearchTerm,
        filteredIngredients,
        showDropdown,
        setShowDropdown,
        selectedIngredients,
        totals,
        handleAddIngredient,
        handleQuantityChange,
        handleRemoveIngredient,
        handleClearAll,
    }
}