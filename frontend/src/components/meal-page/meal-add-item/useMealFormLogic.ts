import { useAuthStore } from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { mealFormSchema, type MealFormData } from "./mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { MealFormModalProps } from "@/types/meals.types";
import { useMealPageLogic } from "../useMealPageLogic";
import { createMeal, updateMeal } from "@/services/api/protectedMeal.service";
import toast from "react-hot-toast";
import { mealKeys } from "@/hooks/react-query/useMealQuery";


export const useMealFormLogic = ({ isOpen, onClose, meal, mode }: MealFormModalProps) => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        categories,
        dietTypes,
    } = useMealPageLogic();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<MealFormData>({
        resolver: zodResolver(mealFormSchema),
        defaultValues: {
            meal_name: "",
            desc: "",
            image: "",
            category: "breakfast",
            diet_type: [],
            recipe: {
                cuisine_type: "Vietnamese",
                desc_step: "",
                cook_time: 30,
                serve: 2,
            },
            nutrition: {
                calories: 0,
                protein: 0,
                carbohydrate: 0,
                fat: 0,
                fiber: 0,
                sugar: 0,
                sodium: 0,
            },
            ingredients: [{ ingredient_name: "", quantity: 0, units: "g" }],
        },
    });

    const ingredients = watch("ingredients");

    // Load meal data for edit mode
    useEffect(() => {
        if (mode === "edit" && meal) {
            reset({
                meal_name: meal.meal_name,
                desc: meal.desc,
                image: meal.image || "",
                category: meal.category,
                diet_type: meal.diet_type,
                recipe: {
                    cuisine_type: meal.recipe?.cuisine_type || "Vietnamese",
                    desc_step: meal.recipe?.desc_step || "",
                    cook_time: meal.recipe?.cook_time || 30,
                    serve: meal.recipe?.serve || 2,
                },
                nutrition: {
                    calories: meal.nutrition?.calories || 0,
                    protein: meal.nutrition?.protein || 0,
                    carbohydrate: meal.nutrition?.carbs || 0,
                    fat: meal.nutrition?.fat || 0,
                    fiber: meal.nutrition?.fiber || 0,
                    sugar: meal.nutrition?.sugar || 0,
                    sodium: meal.nutrition?.sodium || 0,
                },
                ingredients: meal.ingredients?.map((ing) => ({
                    ingredient_name: ing.ingredient_name || "",
                    quantity: ing.quantity,
                    units: ing.unit,
                })) || [{ ingredient_name: "", quantity: 0, units: "g" }],
            });
        }
    }, [mode, meal, reset]);

    const addIngredient = () => {
        const currentIngredients = watch("ingredients");
        setValue("ingredients", [
            ...currentIngredients,
            { ingredient_name: "", quantity: 0, units: "g" },
        ]);
    };

    const removeIngredient = (index: number) => {
        const currentIngredients = watch("ingredients");
        if (currentIngredients.length > 1) {
            setValue(
                "ingredients",
                currentIngredients.filter((_, i) => i !== index)
            );
        }
    };

    const onSubmit = async (data: MealFormData) => {
        try {
            setIsSubmitting(true);

            if (mode === "create") {
                await createMeal(data);
                toast.success("Tạo món ăn thành công!");
            } else if (meal) {
                await updateMeal(meal.meal_id, data);
                toast.success("Cập nhật món ăn thành công!");
            }

            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: mealKeys.all });

            onClose();
            reset();
        } catch {
            toast.error("Đã xảy ra lỗi khi lưu món ăn. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        register,
        control,
        handleSubmit,
        errors,
        isSubmitting,
        categories,
        dietTypes,
        ingredients,
        addIngredient,
        removeIngredient,
        onSubmit,
        reset,
        setValue,
        user,
        onClose,
        meal,
        mode,
        isOpen
    };
};
