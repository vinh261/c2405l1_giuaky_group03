import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { useForgotPasswordLogic } from "./useForgotPasswordLogic";
import { Link } from "react-router";
import Button from "@/components/common/button/ButtonCustom";
import { LoadingSpinner } from "@/components/common/loading";
import logo from "@/assets/images/logo-healthy.png";


const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        getValues,
        error,
        isSuccess,
        setIsSuccess,
        setError,
        forgotPasswordMutation,
    } = useForgotPasswordLogic();

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Kiểm tra email của bạn
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Chúng tôi tôi đã gửi một email đến{" "}
                            {getValues("email")}
                        </p>
                        <p className="mt-4 text-sm text-gray-600">
                            Chưa nhận được email? Kiểm tra hòm thư spam hoặc{" "}
                            <button
                                onClick={() => {
                                    setIsSuccess(false);
                                    setError(null);
                                }}
                                className="font-medium text-green-600 hover:text-green-500">
                                thử lại
                            </button>
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[url('@/assets/images/auth/bg-auth.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-lg w-full border border-slate-300 rounded-xl py-4 px-8 bg-gradient-to-b from-sky-300 from-10% via-white via-60% to-white grid place-items-center shadow-lg">
                <img src={logo} alt="Healthy Logo" className="object-cover h-38 cursor-pointer" />

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Bạn quên mật khẩu?
                    </h2>
                    <p className="mt-2 text-center text-slate-600">
                        Đừng lo lắng! Chúng tôi sẽ giúp bạn đặt lại mật khẩu của mình.
                    </p>
                </div>

                <form
                    className="mt-8 space-y-6 w-full"
                    onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                className="pl-10 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-green-500"
                                placeholder="abc@gmail.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full h-12 flex border border-slate-300 transition-colors duration-300 text-base hover:border-sky-500 hover:bg-sky-500 hover:text-slate-100"
                            disabled={forgotPasswordMutation.isPending}>
                            {forgotPasswordMutation.isPending ? (
                                <>
                                    <LoadingSpinner
                                        size="sm"
                                        className="mr-2"
                                    />
                                    Đang gửi...
                                </>
                            ) : (
                                "Gửi yêu cầu"
                            )}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ForgotPassword;
