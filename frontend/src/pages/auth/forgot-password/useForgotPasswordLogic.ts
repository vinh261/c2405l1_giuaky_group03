import { useForgotPassword } from '@/hooks/react-query/useAuthQuery';
import type { ApiError } from '@/types/api.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';


/**
 * Dùng mailtrap để gửi email reset mật khẩu
 */
const forgotPasswordSchema = z.object({
    email: z.string().email('Vui lòng nhập email'),
});
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordLogic = () => {
    const forgotPasswordMutation = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: ForgotPasswordForm) => {
        forgotPasswordMutation.mutate(data.email, {
            onError: (error: ApiError) => {
                console.log("Lỗi quên mật khẩu:", error);
            },
        });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        getValues,
        forgotPasswordMutation,
    }
}
