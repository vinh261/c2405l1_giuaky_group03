import { authService } from "@/services/api/auth.service";
import { useAuthStore } from "@/stores/authStore";
import type { ApiError, LoginCredentials, RegisterCredentials } from "@/types/api.types";
import type { Profile, User } from "@/types/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


// Query keys
export const authKeys = {
    all: ["auth"] as const,
    user: () => [...authKeys.all, "user"] as const,
};

// Check auth status (dùng trong AuthInitialize)
export function useCheckAuth() {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    return useQuery({
        queryKey: authKeys.user(),
        queryFn: checkAuth,
        retry: false,
        refetchOnWindowFocus: false,
    });
}

// Login mutation
export function useLogin() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
        onSuccess: async (response) => {
            // Tạo user object phù hợp với store
            const userForStore: User = {
                user_id: response.user_id,
                email: response.email,
                profile: undefined,
            };
            
            // Trick: Clear trước rồi set lại để force re-render
            setAuth({ user: null,  });
            setTimeout(() => {
                setAuth({ user: userForStore,  });
                navigate("/");
            }, 500);
        },
        onError: () => {
            toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
        },
    });
}

// Register mutation
export function useRegister() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
        onSuccess: async (_, credentials) => {
            toast.success('Đăng ký thành công! Bạn sẽ được tự động đăng nhập, vui lòng đợi trong giây lát.');

            // Auto login với credentials vừa register
            const loginCredentials = {
                email: credentials.email,
                password: credentials.password
            };

            // Gọi login service
            try {
                const loginResponse = await authService.login(loginCredentials);
                
                // Set auth với data từ login (có role)
                const userForStore: User = {
                    user_id: loginResponse.user_id,
                    email: loginResponse.email,
                    profile: undefined,
                };

                // Trick: Clear trước rồi set lại để force re-render
                setAuth({ user: null,  });
                setTimeout(() => {
                    setAuth({ user: userForStore,  });
                    navigate("/");
                }, 500);
            } catch {
                toast.error('Có lỗi xảy ra. Vui lòng đăng ký lại.');
            }
        },
        onError: () => {
            toast.error('Đăng ký thất bại. Vui lòng kiểm tra thông tin và thử lại trong giây lát.');
        },
    });
}

// Logout mutation
export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            // Clear auth state
            clearAuth();

            // Clear all queries
            queryClient.clear();

            // Navigate to homepage
            navigate("/");
        },
        onError: (error: ApiError) => {
            console.error("Logout error:", error);
            // Even if logout fails on server, clear local state
            clearAuth();
            queryClient.clear();
            navigate("/");
        },
    });
}

// Update profile mutation
export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const updateProfile = useAuthStore((state) => state.updateProfile);

    return useMutation({
        mutationFn: (data: Partial<Profile>) => authService.updateProfile(data),
        onSuccess: (response) => {
            // Update profile trong store
            if (response) {
                updateProfile(response);
            }

            // Invalidate user queries
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
        },
        onError: (error: ApiError) => {
            const message = error.response?.data?.message || 'Update profile failed';
            console.error('Update profile error:', message);
        },
    });
}

// Forgot password mutation
export function useForgotPassword() {
    return useMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
        onSuccess: () => {
            toast.success('Đã gửi email reset mật khẩu. Vui lòng kiểm tra email của bạn.');
        },
        onError: () => {
            toast.error('Gửi email thất bại. Vui lòng thử lại sau.');
        },
    });
}

// Reset password mutation
export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: {
            token: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => authService.resetPassword(data),
        onSuccess: () => {
            toast.success('Mật khẩu đã được đặt lại thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        },
        onError: () => {
            toast.error('Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.');
        },
    });
}

