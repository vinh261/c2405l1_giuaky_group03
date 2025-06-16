import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealFormSchema, type MealFormData } from "../../types/add-meal-schema";


const MAX_FILE_SIZE = 5 * 1920 * 1080; // 5MB

export const useMealForm = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const form = useForm<MealFormData>({
        resolver: zodResolver(mealFormSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "ingredients",
    });

    const dietType = form.watch("diet_type");

    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (file.size > MAX_FILE_SIZE) {
                alert("File size must be less than 5MB");
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        },
        []
    );

    const toggleDietType = useCallback(
        (type: string) => {
            const currentDietTypes = dietType || [];
            const newDietTypes: string[] = currentDietTypes.includes(type)
                ? currentDietTypes.filter((t: string) => t !== type)
                : [...currentDietTypes, type];

            form.setValue("diet_type", newDietTypes);
        },
        [dietType, form]
    );

    const resetForm = useCallback(() => {
        form.reset();
        setImageFile(null);
        setImagePreview("");
    }, [form]);

    return {
        ...form,
        fields,
        append,
        remove,
        imageFile,
        imagePreview,
        dietType,
        handleImageChange,
        toggleDietType,
        resetForm,
        setImageFile,
        setImagePreview,
    };
};