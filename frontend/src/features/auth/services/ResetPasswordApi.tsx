import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import type { ResetFormProps } from "../types/auth.types";
import axios from "@/types/axios";


const ResetPasswordApi = () => {
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

    return {
        message,
        error,
        register,
        handleSubmit,
        formState: { errors },
        onSubmit
    } ;
};

export default ResetPasswordApi;
