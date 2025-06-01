import { useForm } from "react-hook-form";
import axios from "../../types/axios";
import type { FormProps } from "../../types/models.types";
import { KeyboardIcon, LockKeyhole, Mail } from "lucide-react";
import logo from "../../assets/images/logo-healthy.png"
import { useToDo } from "../../hooks/useToDo";
import { useNavigate } from "react-router";


const Register = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormProps>();
    const { loading, setLoading, errorMessage, setErrorMessage } = useToDo();
    const navigate = useNavigate();

    const onSubmit = async (data: FormProps) => {
        setLoading(true);
        setErrorMessage("");

        try {
            /**
             * Gửi request đăng ký.
             * Nếu thành công thì reset form và chuyển hướng đến trang đăng nhập.
             */
            await axios.post("/api/register", data);
            alert("Đăng ký thành công!");

            reset();
            navigate("/login");
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Lỗi từ backend:", error.response?.data);
                const backendErrors = error.response?.data?.errors;
                if (backendErrors) {
                    const errorMessages = Object.values(backendErrors).flat().join(', ');
                    setErrorMessage(errorMessages);
                } else {
                    setErrorMessage(error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
                }
            } else {
                setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-login min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-8 max-w-md border w-full rounded shadow-md border-slate-300 bg-gradient-to-b from-sky-300 from-10% via-white via-60% to-white z-10">
                <img src={logo} alt="Healthy Logo" className="object-cover h-38 cursor-pointer" title="Quay lại trang chủ" onClick={() => navigate("/")} />

                <p className="text-2xl font-bold text-center">Đăng ký</p>

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

                <div>
                    <input
                        id="password_confirmation"
                        type="password"
                        {...register("password_confirmation", { required: "Vui lòng xác nhận lại mật khẩu" })}
                        placeholder="Xác nhận mật khẩu"
                        className="border border-gray-300 rounded p-2 pl-10 w-full"
                    />
                    <KeyboardIcon className="absolute -mt-8 ml-2 text-gray-400" />
                    {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
                </div>

                <button
                    type="submit"
                    className={`bg-blue-500 text-white py-2 px-4 rounded text-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đăng ký"}
                </button>

                <div className="text-center text-sm text-gray-600 flex justify-between">
                    <span>
                        Đã có tài khoản? 
                        <a href="/login" className="text-blue-500 transition-colors duration-300 hover:underline"> Đăng nhập</a>
                    </span>

                    <a href="/" className="text-blue-500 transition-colors duration-300 hover:underline">Quay lại trang chủ</a>
                </div>
            </form>
        </div>
    )
};

export default Register;