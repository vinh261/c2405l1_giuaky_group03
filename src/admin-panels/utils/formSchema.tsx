import { z } from "zod";


// DINH NGHIA FIELD VALIDATE:
export const formSchema = z.object({
    user_name: z.string({
        required_error: "Vui lòng nhập đầy đủ họ tên.",
    })
                .min(2, "Vui lòng nhập ít nhất 2 ký tự.")
                .max(50, "Chỉ được nhập tối đa 50 ký tự.")
                .refine(name => /^[\p{L} ]+$/u.test(name), "Vui lòng chỉ nhập chữ cái và khoảng trắng."),
    
    // BIRTH:
    dob: z.coerce.date()
                .max(new Date('1/1/2020'), "Quá nhỏ để đăng ký.")
                .min(new Date('1/1/1930'), "Quá lớn để đăng ký.")
                .optional(),

    // GENDER:
    gender: z.enum(['male', 'female', 'other'])
                .optional(),

    // PHONE:
    phone: z.string()
                .regex(/^(0[0-9]{9}|84[0-9]{9})$/, "Vui lòng nhập đủ 10 số.")
                .optional(),

    // EMAIL:
    email: z.string({
        required_error: "Vui lòng nhập email.",
    })
                .max(50, "Chỉ được nhập tối đa 50 ký tự.")
                .email("Vui lòng nhập đúng định dạng email."),

    weight: z.string().optional(),

    height: z.string().optional(),

    password: z.string({
        required_error: "Vui lòng nhập mật khẩu."
    })
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
                .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa.")
                .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường.")
                .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số.")
                .regex(/[\W_]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt."),

    job: z.string()
                .min(2, "Công việc không hợp lệ.")
                .optional(),

    country: z.string().optional(),

    city: z.string().optional(),

    district: z.string().optional(),

    ward: z.string().optional(),

    note: z.string().optional(),

    role: z.enum(['admin', 'user']).optional(),
});

// CONVERT CÁC FIELD TRONG formSchema SANG TYPE TYPESCRIPT = z.infer:
export type typeForm = z.infer<typeof formSchema>;


// EDIT FORM:
// export const editFormSchema = z.object({
//     // NAME:
//     user_name: z.string({
//         required_error: "Vui lòng nhập đầy đủ họ tên.",
//     })
//                 .min(2, "Vui lòng nhập ít nhất 2 ký tự.")
//                 .max(50, "Chỉ được nhập tối đa 50 ký tự.")
//                 .refine(name => /^[\p{L} ]+$/u.test(name), "Vui lòng chỉ nhập chữ cái và khoảng trắng."),

//     // BIRTH:
//     dob: z.coerce.date()
//                 .max(new Date('1/1/2020'), "Quá nhỏ để đăng ký.")
//                 .min(new Date('1/1/1930'), "Quá lớn để đăng ký.")
//                 .optional(),

//     // GENDER:
//     gender: z.enum(['male', 'female', 'other'])
//                 .optional(),

//     // PHONE:
//     phone: z.string()
//                 .regex(/^(0[0-9]{9}|84[0-9]{9})$/, "Vui lòng nhập đủ 10 số.")
//                 .optional(),

//     // EMAIL:
//     email: z.string({
//         required_error: "Vui lòng nhập email.",
//     })
//                 .max(50, "Chỉ được nhập tối đa 50 ký tự.")
//                 .email("Vui lòng nhập đúng định dạng email."),

//     // PASSWORD:
//     password: z.string({
//         required_error: "Vui lòng nhập mật khẩu."
//     })
//                 .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
//                 .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa.")
//                 .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường.")
//                 .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số.")
//                 .regex(/[\W_]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.")
//                 .optional() // Cho phép bỏ trống
//                 .or(z.literal('')), // Hoặc là chuỗi rỗng (vì input có thể trả về rỗng)

//     weight: z.string().optional(),

//     height: z.string().optional(),

//     job: z.string()
//                 .min(2, "Công việc không hợp lệ.")
//                 .optional(),

//     country: z.string().optional(),

//     city: z.string().optional(),

//     district: z.string().optional(),

//     ward: z.string().optional(),

//     note: z.string().optional(),

//     status: z.enum(['active', 'inactive'])
//                 .optional(),
                
//     role: z.enum(['admin', 'user']).optional(),
// });

// export type EditTypeForm = z.infer<typeof editFormSchema>;
