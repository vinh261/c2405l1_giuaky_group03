import { useLogin } from '@/hooks/react-query/useAuthQuery';
import type { ApiError, LoginCredentials } from '@/types/api.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';


const loginSchema = z.object({
    email: z.string().email('Vui lòng nhập email'),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    remember: z.boolean().optional(),
});

export const useLoginLogic = () => {
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            remember: false,
        },
    });

    const onSubmit = (data: LoginCredentials) => {
        loginMutation.mutate(data, {
            onError: (error: ApiError) => {
                console.log("Lỗi đăng nhập:", error);
            }
        });
    };

    return {
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword,
        onSubmit,
        isLoading: loginMutation.isPending,
        loginMutation,
        remember: loginMutation.variables?.remember || false,
    };
}