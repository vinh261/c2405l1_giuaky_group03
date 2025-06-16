import { LoadingSpinner } from "@/components/common/loading";
import { useFavoritesSync } from "@/hooks/useFavSync";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

/**
 *  cập nhật state isLoading toàn cục.
 *  hiển thị màn hình loading cho toàn bộ ứng dụng trong khi quá trình kiểm tra này diễn ra.
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
    const { isLogged, checkAuth, user  } = useAuthStore();
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        // Chỉ check auth nếu isLogged = true (từ localStorage)
        if (isLogged && !user) {
            setIsChecking(true);
            checkAuth()
                .catch(() => {
                // Nếu lỗi 401, có nghĩa session expired
                console.log('Session expired or invalid');
                })
                .finally(() => setIsChecking(false));
        }
    }, [isLogged, user, checkAuth]);

    // Sync favorites một lần khi user login
    useFavoritesSync();

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return <>{children}</>;
}
export default AuthInitializer;
