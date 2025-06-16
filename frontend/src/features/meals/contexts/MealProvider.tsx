import type React from "react";
import { MealContext } from "./MealContext";
import { useCallback, useMemo } from "react";
import { formatDayMonthYear } from "@/admin-panels/utils/formatData";
import { type MealFormData } from "../types/add-meal-schema";
import type { MealProviderProps } from "../types/meals.types";
import { useMealDetailState } from "../hooks/provider/useMealDetailState";
import { usePagination } from "../hooks/provider/usePagination";
import { useMealForm } from "../hooks/provider/useMealForm";


const MealProvider: React.FC<MealProviderProps> = ({
    children,
    onSubmit,
    onClose,
}) => {
    const modalStates = useMealDetailState();
    const mealForm = useMealForm();
    const pagination = usePagination();

    // Get today's date
    const today = useMemo(() => {
        return formatDayMonthYear(new Date());
    }, []);

    // Form submit handler
    const onFormSubmit = useCallback(
        (data: MealFormData) => {
            if (!mealForm.imageFile) {
                alert("Vui lòng chọn hình ảnh");
                return;
            }

            const finalData = {
                ...data,
                image: mealForm.imageFile,
                imagePreview: mealForm.imagePreview,
            };

            onSubmit?.(finalData);
            mealForm.resetForm();
            onClose?.();
        },
        [
            mealForm,
            onSubmit,
            onClose,
        ]
    );

    const contextValue = useMemo(
        () => ({
            // Modal states
            openCalc: modalStates.openCalc,
            openMealDetail: modalStates.openMealDetail,
            openAddMeal: modalStates.openAddMeal,
            refCalc: modalStates.refCalc,
            refMealDetail: modalStates.refMealDetail,
            refAddMeal: modalStates.refAddMeal,
            handleOpenCalc: modalStates.handleOpenCalc,
            handleOpenMealDetail: modalStates.handleOpenMealDetail,
            handleOpenAddMeal: modalStates.handleOpenAddMeal,

            // Form
            register: mealForm.register,
            handleSubmit: mealForm.handleSubmit,
            errors: mealForm.formState.errors,
            fields: mealForm.fields as import("react-hook-form").FieldArrayWithId<MealFormData, "ingredients", "id">[],
            append: mealForm.append,
            remove: mealForm.remove,
            handleImageChange: mealForm.handleImageChange,
            toggleDietType: mealForm.toggleDietType,
            onFormSubmit,
            setImageFile: mealForm.setImageFile,
            setImagePreview: mealForm.setImagePreview,
            imagePreview: mealForm.imagePreview,
            dietType: mealForm.dietType,

            // Pagination
            currentPagePaginate: pagination.currentPagePaginate,
            setCurrentPagePaginate: pagination.setCurrentPagePaginate,
            totalPagePaginate: pagination.totalPagePaginate,
            currentItemPaginate: pagination.currentItemPaginate.map(item => ({
                ...item,
                name: item.label ?? "", // or map appropriately
                image: item.img ?? "",
                day: today,
            })),

            // Utils
            today,

            // Required functions
            onClose: onClose || (() => {}),
            onSubmit: onSubmit || (() => {}),
        }),
        [
            modalStates.openCalc,
            modalStates.openMealDetail,
            modalStates.openAddMeal,
            modalStates.refCalc,
            modalStates.refMealDetail,
            modalStates.refAddMeal,
            modalStates.handleOpenCalc,
            modalStates.handleOpenMealDetail,
            modalStates.handleOpenAddMeal,
            mealForm.register,
            mealForm.handleSubmit,
            mealForm.formState.errors,
            mealForm.fields,
            mealForm.append,
            mealForm.remove,
            mealForm.handleImageChange,
            mealForm.toggleDietType,
            onFormSubmit,
            mealForm.setImageFile,
            mealForm.setImagePreview,
            mealForm.imagePreview,
            mealForm.dietType,
            pagination.currentPagePaginate,
            pagination.setCurrentPagePaginate,
            pagination.totalPagePaginate,
            pagination.currentItemPaginate,
            today,
            onClose,
            onSubmit,
        ]
    );

    return (
        <MealContext.Provider value={contextValue}>
            {children}
        </MealContext.Provider>
    );
};
export default MealProvider;