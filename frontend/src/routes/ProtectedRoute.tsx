import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet } from "react-router";

/**
 * login required
 */
export default function ProtectedRoute() {
    const isLogged = useAuthStore((state) => state.isLogged);

    // Nếu chưa login thì redirect về login
    // Lưu lại location hiện tại để sau khi login có thể quay lại
    if (!isLogged) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}