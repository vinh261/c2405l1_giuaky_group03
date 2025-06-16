import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiError, RegisterCredentials } from "@/types/api.types";
import { useState } from "react";
import { useRegister } from "@/hooks/react-query/useAuthQuery";


// Validation schema
const registerSchema = z.object({
    email: z.string().email('Vui lòng nhập địa chỉ email'),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["password_confirmation"],
});

export const useRegisterLogic = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterCredentials>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterCredentials) => {
        registerMutation.mutate(data, {
            onError: (error: ApiError) => {
                console.log("Lỗi đăng ký:", error);
            }
        });
    };

    return {
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword,
        showPasswordConfirm,
        setShowPasswordConfirm,
        onSubmit,
        isLoading: registerMutation.isPending,
        registerMutation,
    }
}