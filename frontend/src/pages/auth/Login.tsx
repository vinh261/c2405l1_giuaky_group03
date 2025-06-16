import { LockKeyhole, Mail } from "lucide-react";
import logo from "@/assets/images/logo-healthy.png"
import ForgotPassword from "./ForgotPassword";
import LoginApi from "@/features/auth/services/LoginApi";


const Login = () => {
    const { 
        loading,
        errorMessage,
        forgotPassword,
        setForgotPassword,
        register,
        handleSubmit,
        errors,
        onSubmit,
        handleForgotPassword
    } = LoginApi();

    return (
        <div className="bg-login min-h-screen flex items-center justify-center text-slate-800">
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