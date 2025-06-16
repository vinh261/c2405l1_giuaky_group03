import { useForm } from "react-hook-form";
import type { FormProps, UserData } from "../types/auth.types";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import axios from "@/types/axios";


const LoginApi = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>();
    const navigate = useNavigate();
    const {
        handleLogin,
        loading,
        setLoading,
        errorMessage,
        setErrorMessage,
        forgotPassword,
        setForgotPassword,
    } = useAuth();

    const onSubmit = async (data: FormProps) => {
        setLoading(true);
        setErrorMessage("");

        try {
            // Lấy CSRF token.
            await axios.get("/sanctum/csrf-cookie");

            // Gửi yêu cầu đăng nhập.
            await axios.post("/api/login", data);

            // Lấy thông tin người dùng sau khi đăng nhập thành công.
            const userResponse = await axios.get<UserData>("/api/me");

            // Lưu thông tin người dùng vào context.
            handleLogin(userResponse.data);
            console.log("Login: ", handleLogin(userResponse.data));

            alert("Đăng nhập thành công!");
            navigate("/");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.log("Lỗi Axios:", {
                    status: err.response?.status,
                    data: err.response?.data,
                });
                setErrorMessage(
                    err.response?.data?.message || "Đăng nhập thất bại."
                );
            } else {
                setErrorMessage("Lỗi không xác định. Vui lòng thử lại sau.");
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Xử lý gửi yêu cầu khôi phục mật khẩu.
     * Hiển thị modal để người dùng nhập email.
     */
    const handleForgotPassword = async (email: string) => {
        try {
            await axios.post("/api/forgot-password", { email });
            alert("Yêu cầu khôi phục mật khẩu đã được gửi!");
            setForgotPassword(false); // Đóng modal sau khi gửi yêu cầu
        } catch (error) {
            console.error("Khôi phục mật khẩu thất bại:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return {
        loading,
        errorMessage,
        forgotPassword,
        setForgotPassword,
        register,
        handleSubmit,
        errors,
        onSubmit,
        handleForgotPassword,
    };
};

export default LoginApi;
