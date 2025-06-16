import { z } from "zod";


export const mealFormSchema = z.object({
    meal_name: z.string().min(3, "Tên món ăn phải có ít nhất 3 ký tự"),
    desc: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự").max(255, "Mô tả không được quá 255 ký tự"),
    image: z
        .string()
        .url("URL hình ảnh không hợp lệ")
        .optional()
        .or(z.literal("")),
    category: z.enum(["breakfast", "lunch", "dinner", "snacks", "smoothies"]),
    diet_type: z.array(z.string()).min(1, "Chọn ít nhất 1 loại chế độ ăn"),
    recipe: z.object({
        cuisine_type: z.string().min(2, "Loại ẩm thực là bắt buộc"),
        desc_step: z.string().min(20, "Hướng dẫn phải có ít nhất 20 ký tự"),
        cook_time: z.number().min(1, "Thời gian nấu phải lớn hơn 0"),
        serve: z.number().min(1, "Khẩu phần phải lớn hơn 0"),
    }),
    nutrition: z.object({
        calories: z.number().min(0, "Calories phải lớn hơn hoặc bằng 0"),
        protein: z.number().min(0),
        carbohydrate: z.number().min(0),
        fat: z.number().min(0),
        fiber: z.number().min(0),
        sugar: z.number().min(0),
        sodium: z.number().min(0),
    }),
    ingredients: z
        .array(
            z.object({
                ingredient_name: z
                    .string()
                    .min(1, "Tên nguyên liệu là bắt buộc"),
                quantity: z.number().min(0.1, "Số lượng phải lớn hơn 0"),
                units: z.string().min(1, "Đơn vị là bắt buộc"),
            })
        )
        .min(1, "Thêm ít nhất 1 nguyên liệu"),
});

export type MealFormData = z.infer<typeof mealFormSchema>;
