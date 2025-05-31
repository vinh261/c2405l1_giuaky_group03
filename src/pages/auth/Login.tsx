import { useForm } from "react-hook-form";
import type { FormProps, UserData } from "../../types/models.types";
import axios from "../../types/axios";
import { LockKeyhole, Mail } from "lucide-react";
import logo from "../../assets/images/logo-healthy.png"
import { useNavigate } from "react-router";
import { useToDo } from "../../hooks/useToDo";
import ForgotPassword from "./ForgotPassword";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>();
    const navigate = useNavigate();
    const { 
        handleLogin, loading, setLoading, 
        errorMessage, setErrorMessage,
        forgotPassword, setForgotPassword,
    } = useToDo();

    const onSubmit = async (data: FormProps) => {
        setLoading(true);
        setErrorMessage('');
        
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
                setErrorMessage(err.response?.data?.message || "Đăng nhập thất bại.");
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

    return (
        <div className="bg-login min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-8 max-w-md border w-full rounded shadow-md border-slate-300 bg-gradient-to-b from-sky-300 from-10% via-white via-60% to-white z-10">
                <img src={logo} alt="Healthy Logo" className="object-cover h-38 cursor-pointer" title="Quay lại trang chủ" onClick={() => window.location.href = "/"} />

                <p className="text-2xl font-bold text-center">Đăng nhập</p>

                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                <div>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: "Vui lòng nhập email.", pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" } })}
                        placeholder="Email"
                        className="relative border border-gray-300 rounded p-2 pl-10 w-full"
                    />
                    <Mail className="absolute -mt-8 ml-2 text-gray-400" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: "Vui lòng nhập mật khẩu.", minLength: { value: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" } })}
                        placeholder="Mật khẩu"
                        className="relative border border-gray-300 rounded p-2 pl-10 w-full"
                    />
                    <LockKeyhole className="absolute -mt-8 ml-2 text-gray-400" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="text-right">
                    <a 
                        onClick={() => setForgotPassword(!forgotPassword)} // Hiển thị modal khi nhấn
                        className="text-blue-500 transition-colors duration-300 hover:underline cursor-pointer"
                    >
                        Quên mật khẩu?
                    </a>
                </div>

                <button
                    type="submit"
                    className={`bg-blue-500 text-white py-2 px-4 rounded text-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>

                <div className="text-center text-sm text-gray-600 flex justify-between">
                    <span>
                        Chưa có tài khoản? 
                        <a href="/register" className="text-blue-500 transition-colors duration-300 hover:underline"> Đăng ký</a>
                    </span>

                    <a href="/" className="text-blue-500 transition-colors duration-300 hover:underline">Quay lại trang chủ</a>
                </div>
            </form>

            {/* Modal Forgot Password */}
            <ForgotPassword
                isVisible={!!forgotPassword}
                onClose={() => setForgotPassword && setForgotPassword(false)}
                onSubmit={handleForgotPassword}
            />
        </div>
    )
};

export default Login;