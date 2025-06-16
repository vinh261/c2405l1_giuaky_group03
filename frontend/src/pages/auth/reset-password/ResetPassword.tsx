import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useResetPasswordLogic } from "./useResetPasswordLogic";
import { Link } from "react-router";
import Button from "@/components/common/button/ButtonCustom";
import { LoadingSpinner } from "@/components/common/loading";
import logo from "@/assets/images/logo-healthy.png";


const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        onSubmit,
        resetPasswordMutation,
        showPassword,
        setShowPassword,
        showPasswordConfirm,
        setShowPasswordConfirm,
        errors,
    } = useResetPasswordLogic();

    return (
        <section className="min-h-screen flex items-center justify-center bg-[url('@/assets/images/auth/bg-auth.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-md w-full space-y-8max-w-xl bg-gradient-to-b from-sky-300 from-10% via-white via-70% to-white p-8 border border-slate-300 rounded-lg grid place-items-center shadow-lg">
                <img src={logo} alt="Healthy Logo" className="object-cover h-38 cursor-pointer" />

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Đặt lại mật khẩu
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Đặt lại mật khẩu của bạn để tiếp tục sử dụng tài khoản Healthy.
                    </p>
                </div>

                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}>

                    <div className="space-y-4">
                        {/* New Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700">
                                Mật khẩu mới
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    autoComplete="new-password"
                                    className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Nhập mật khẩu mới"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700">
                                Xác nhận mật khẩu
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("password_confirmation")}
                                    type={
                                        showPasswordConfirm
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="new-password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Xác nhận mật khẩu"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPasswordConfirm(
                                            !showPasswordConfirm
                                        )
                                    }>
                                    {showPasswordConfirm ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password_confirmation.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full h-12 flex border border-slate-300 transition-colors duration-300 text-base hover:border-sky-500 hover:bg-sky-500 hover:text-slate-100"
                            disabled={resetPasswordMutation.isPending}>
                            {resetPasswordMutation.isPending ? (
                                <>
                                    <LoadingSpinner
                                        size="sm"
                                        className="mr-2"
                                    />
                                    Đang làm việc...
                                </>
                            ) : (
                                "Xác nhận"
                            )}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại trang chủ
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};
export default ResetPassword;
