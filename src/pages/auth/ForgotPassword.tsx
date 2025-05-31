import { useForm } from "react-hook-form";
import { useToDo } from "../../hooks/useToDo";
import { cn } from "../../types/cn";
import type { ForgotPasswordModalProps } from "../../types/models.types";


const ForgotPassword: React.FC<ForgotPasswordModalProps> = ({
    isVisible,
    onClose,
    onSubmit,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string }>();

    const { loading, setLoading } = useToDo();

    // Kiểm tra nếu `isVisible` là `false`, không hiển thị modal
    if (!isVisible) return null;
    
    const handleFormSubmit = async (data: { email: string }) => {
        setLoading(true); // Bật trạng thái loading khi bắt đầu gửi yêu cầu
        try {
            await onSubmit(data.email); // Gọi hàm onSubmit được truyền từ props
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu khôi phục mật khẩu:", err);
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi hoàn tất
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-xl backdrop-brightness-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <p className="text-center font-medium text-lg mb-4">
                    Khôi phục mật khẩu
                </p>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-4">
                    <div>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Vui lòng nhập email.",
                            })}
                            placeholder="Nhập email"
                            className="w-full border border-gray-300 rounded p-2"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={cn("bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600", loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600")}
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 text-gray-500 hover:underline text-sm block mx-auto">
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
