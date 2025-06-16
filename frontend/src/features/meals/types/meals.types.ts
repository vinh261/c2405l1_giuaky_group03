import type { FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import type { MealFormData } from "./add-meal-schema";
import type { Dispatch, SetStateAction } from "react";

export type CaloriesFilter = {
    min: number;
    max: number;
}
export type MealFilter = {
    mealTypes: string[];
    dietTypes: string[];
    calories: CaloriesFilter;
}
export type MealItem = {
    name: string;
    image: string;
    day: string;
    img: string;
    price: string;
    label: string;
    desc: string;
    mealType: string;
    dietTypes: string[];
    calories: number;
    recipe: { recipeDetail: string[]; images: string }[];
};
export type Nutrition = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
}
export type IngredientItem = {
    name: string;
    unit: string;
    per: number;
    nutrition: Nutrition;
}
export type Ingredient = IngredientItem & {
    id: number;
    key: string;
    quantity: number;
}
export type MealItemPlanner = {
    id: string;
    name: string;
    image: string;
    cookingTime: number;
    day: string;
    mealType: "sáng" | "trưa" | "tối" | "ăn vặt";
}
export type MealContextType = {
    // Modal states
    openCalc: boolean;
    openMealDetail: boolean;
    openAddMeal: boolean;
    refCalc: React.RefObject<HTMLElement | null>;
    refMealDetail: React.RefObject<HTMLElement | null>;
    refAddMeal: React.RefObject<HTMLElement | null>;
    handleOpenCalc: () => void;
    handleOpenMealDetail: () => void;
    handleOpenAddMeal: () => void;

    // Form controls
    register: UseFormRegister<MealFormData>;
    handleSubmit: UseFormHandleSubmit<MealFormData>;
    errors: FieldErrors<MealFormData>;
    fields: FieldArrayWithId<MealFormData, "ingredients", "id">[];
    append: UseFieldArrayAppend<MealFormData, "ingredients">;
    remove: UseFieldArrayRemove;
    
    // Image handling
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setImageFile: Dispatch<SetStateAction<File | null>>;
    setImagePreview: Dispatch<SetStateAction<string>>;
    imagePreview: string;
    
    // Diet type
    dietType: string[] | undefined;
    toggleDietType: (type: string) => void;
    
    // Form submission
    onFormSubmit: (data: MealFormData) => void;
    onClose: () => void;
    onSubmit: (data: MealFormData & { image: File; imagePreview: string }) => void;

    // Pagination
    currentPagePaginate: number;
    setCurrentPagePaginate: Dispatch<SetStateAction<number>>;
    totalPagePaginate: number;
    currentItemPaginate: MealItem[];

    // Utils
    today: string;
};
export type MealProviderProps = {
    children: React.ReactNode;
    onSubmit?: (
        data: MealFormData & { image: File; imagePreview: string }
    ) => void;
    onClose?: () => void;
}