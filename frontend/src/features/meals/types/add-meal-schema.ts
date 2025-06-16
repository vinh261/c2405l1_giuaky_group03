import { z } from "zod";


export const mealFormSchema = z.object({
    meal_name: z.string().min(1, 'Tên món ăn là bắt buộc').max(100, 'Tên quá dài'),
    desc: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự').max(100, 'Mô tả quá dài'),
    category: z.enum(["breakfast", "lunch", "dinner", "snack"]),
    // price: z.number(),
    calories: z.number().min(1, 'Calories phải lớn hơn 0').max(5000, 'Calories quá cao'),
    carbohydrate: z.number().min(1, 'Carbohydrate phải lớn hơn 0').max(5000, 'Carbohydrate quá cao'),
    fat: z.number().min(1, 'Chất béo phải lớn hơn 0').max(5000, 'Chất béo quá cao'),
    protein: z.number().min(1, 'Protein phải lớn hơn 0').max(5000, 'Protein quá cao'),
    cook_time: z.number().min(1, 'Thời gian chuẩn bị phải lớn hơn 0').max(480, 'Thời gian quá dài'),
    serve: z.number().min(1, 'Khẩu phần phải ít nhất là 1').max(10, 'Khẩu phần quá nhiều'),
    cuisine_type: z.string().min(2, 'Loại ẩm thực').max(50, 'Tên quá dài'),
    diet_type: z.array(z.string()).optional(),
    ingredients: z.array(
        z.object({
            ingredient_name: z.string().min(1, 'Tên nguyên liệu là bắt buộc'),
            quantity: z.string().min(1, 'Số lượng là bắt buộc'),
            unit: z.string(),
        })
    ).min(1, 'Phải có ít nhất 1 nguyên liệu'),
    desc_step: z.string().optional(),
    image: z.instanceof(File).nullable(),
    imagePreview: z.string().optional(),
});

// Tạo một type TypeScript từ schema để sử dụng trong form của bạn
export type MealFormData = z.infer<typeof mealFormSchema> & {
    image: File | null;
    imagePreview?: string;
};