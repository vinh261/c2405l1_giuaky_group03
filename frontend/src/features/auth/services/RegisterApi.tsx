import { useForm } from "react-hook-form";
import type { FormProps } from "../types/auth.types";
import { useAuth } from "../hooks/useAuth";
import axios from "@/types/axios";
import { useNavigate } from "react-router";



export const RegisterApi = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormProps>();
    const { loading, setLoading, errorMessage, setErrorMessage } = useAuth();
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
                    const errorMessages = Object.values(backendErrors)
                        .flat()
                        .join(", ");
                    setErrorMessage(errorMessages);
                } else {
                    setErrorMessage(
                        error.response?.data?.message ||
                            "Đăng ký thất bại. Vui lòng thử lại."
                    );
                }
            } else {
                setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        loading,  
        errorMessage, 
        onSubmit,
        navigate,
    };
};
export default RegisterApi;
