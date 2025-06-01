import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../types/axios";
import type { ResetFormProps } from "../../types/models.types";

const ResetPassword = () => {
    const { token } = useParams(); // Lấy token từ URL
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetFormProps>();

    const onSubmit = async (data: ResetFormProps) => {
        setMessage("");
        setError("");

        try {
            await axios.get("/sanctum/csrf-cookie");

            await axios.post("/api/reset-password", {
                ...data,
                token,
            });

            setMessage(
                "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập lại."
            );
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const messageErr =
                    err.response?.data?.message || "Lỗi không xác định!";
                setError("❌ " + messageErr);
            } else {
                setError("❌ Có lỗi xảy ra, vui lòng thử lại!");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Khôi phục mật khẩu
                </h2>

                {message && <p className="text-green-600 mb-3">{message}</p>}
                {error && <p className="text-red-600 mb-3">{error}</p>}

                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Vui lòng nhập email",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email không hợp lệ",
                            },
                        })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label>Mật khẩu mới</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Vui lòng nhập mật khẩu mới",
                            minLength: {
                                value: 8,
                                message: "Mật khẩu ít nhất 8 ký tự",
                            },
                        })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label>Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        {...register("password_confirmation", {
                            required: "Vui lòng xác nhận mật khẩu",
                        })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-sm">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
                    Đặt lại mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;