import { useResetPassword } from "@/hooks/react-query/useAuthQuery";
// import type { ApiError } from "@/types/api.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router";
import z from "zod";


const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["password_confirmation"],
});
type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordLogic = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const resetPasswordMutation = useResetPassword();
    
    // Get email and token from URL params
    const email = searchParams.get('email');
    const { token } = useParams<{ token: string }>();

    useEffect(() => {
        // Redirect if no token or email
        if (!token || !email) {
            toast.error('Lỗi đường dẫn, vui lòng thử lại');
            navigate('/login');
        }
    }, [token, email, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordForm) => {
        if (!token || !email) return;
        resetPasswordMutation.mutate(
            {
                token,
                email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            },
        );
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        resetPasswordMutation,
        showPassword,
        setShowPassword,
        showPasswordConfirm,
        setShowPasswordConfirm,
    };
};
