import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-healthy.png";
import { useToDo } from "../../hooks/useToDo";
import axios from "../../types/axios";
import type { FormProps, UserData } from "../../types/models.types";
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
      // Lấy CSRF token
      await axios.get("/sanctum/csrf-cookie");

      // Gửi yêu cầu đăng nhập
      await axios.post("/api/login", data);

      // Lấy thông tin người dùng
      const res = await axios.get<UserData>("/api/me");
      const user = res.data;

      // Lưu vào context + localStorage
      handleLogin(user);
      localStorage.setItem("user", JSON.stringify({
        name: user?.profile?.full_name || user.name || user.user_name || "Người dùng"
      }));

      alert("Đăng nhập thành công!");
      navigate("/");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Lỗi Axios:", err.response?.data);
        setErrorMessage(err.response?.data?.message || "Đăng nhập thất bại.");
      } else {
        setErrorMessage("Lỗi không xác định. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await axios.post("/api/forgot-password", { email });
      alert("Đã gửi email khôi phục mật khẩu!");
      setForgotPassword(false);
    } catch (err) {
      console.error("Lỗi gửi yêu cầu khôi phục:", err);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="bg-login min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-8 max-w-md border w-full rounded shadow-md border-slate-300 bg-gradient-to-b from-sky-300 from-10% via-white via-60% to-white z-10"
      >
        <img
          src={logo}
          alt="Healthy Logo"
          className="object-cover h-38 cursor-pointer"
          title="Quay lại trang chủ"
          onClick={() => navigate("/")}
        />

        <p className="text-2xl font-bold text-center">Đăng nhập</p>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        {/* Email */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="relative border border-gray-300 rounded p-2 pl-10 w-full"
            {...register("email", {
              required: "Vui lòng nhập email.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email không hợp lệ",
              },
            })}
          />
          <Mail className="absolute -mt-8 ml-2 text-gray-400" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div>
          <input
            id="password"
            type="password"
            placeholder="Mật khẩu"
            className="relative border border-gray-300 rounded p-2 pl-10 w-full"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu.",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
            })}
          />
          <LockKeyhole className="absolute -mt-8 ml-2 text-gray-400" />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Link quên mật khẩu */}
        <div className="text-right">
          <a
            onClick={() => setForgotPassword(true)}
            className="text-blue-500 transition-colors duration-300 hover:underline cursor-pointer"
          >
            Quên mật khẩu?
          </a>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded text-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

        <div className="text-center text-sm text-gray-600 flex justify-between">
          <span>
            Chưa có tài khoản?
            <a
              href="/register"
              className="text-blue-500 transition-colors duration-300 hover:underline"
            >
              {" "}Đăng ký
            </a>
          </span>
          <a
            href="/"
            className="text-blue-500 transition-colors duration-300 hover:underline"
          >
            Quay lại trang chủ
          </a>
        </div>
      </form>

      {/* Modal Quên mật khẩu */}
      <ForgotPassword
        isVisible={!!forgotPassword}
        onClose={() => setForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
};

export default Login;
