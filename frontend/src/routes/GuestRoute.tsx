import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet } from "react-router";

/**
 * guest user
 */
export default function GuestRoute() {
    const isLogged = useAuthStore((state) => state.isLogged);

    if (isLogged) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}