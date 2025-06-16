import { Link } from "react-router";
import { useLoginLogic } from "./useLoginLogic";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Button from "@/components/common/button/ButtonCustom";
import { LoadingSpinner } from "@/components/common/loading";
import logo from "@/assets/images/logo-healthy.png";


const LoginPage = () => {
    const {
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword,
        onSubmit,
        loginMutation,
    } = useLoginLogic();

    return (
        <section className="min-h-screen flex items-center justify-center bg-[url('@/assets/images/auth/bg-auth.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-xl bg-gradient-to-b from-sky-300 from-10% via-white via-70% to-white p-8 border border-slate-300 rounded-lg grid place-items-center shadow-lg">
                <img src={logo} alt="Healthy Logo" className="object-cover h-38 cursor-pointer" />

                <div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900">
                        Đăng nhập
                    </h2>
                    <p className="mt-2 text-center text-slate-600">
                        Hoặc{" "}
                        <Link
                            to="/register"
                            className="font-medium text-green-600 transition-colors duration-300 hover:text-green-500">
                            Đăng ký nếu chưa có tài khoản
                        </Link>
                    </p>
                    <p className="mt-2 text-center text-slate-600">
                        Xin chào! Hãy đăng nhập để tiếp tục sử dụng dịch vụ của chúng tôi.
                    </p>
                </div>

                <form
                    className="mt-8 space-y-6 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="font-medium text-slate-700">
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

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="font-medium text-slate-700">
                                Mật khẩu
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    className="pl-10 pr-10 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-green-500"
                                    placeholder="Mật khẩu"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-slate-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-slate-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                {...register("remember")}
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-green-600 transition-colors duration-300 border-slate-300 rounded"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-slate-900"
                            >
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-green-600 transition-colors duration-300 hover:text-green-500"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full h-12 flex border border-slate-300 transition-colors duration-300 text-base hover:border-sky-500 hover:bg-sky-500 hover:text-slate-100"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <LoadingSpinner
                                        size="sm"
                                        className="mr-2"
                                    />
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng nhập"
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
export default LoginPage;
