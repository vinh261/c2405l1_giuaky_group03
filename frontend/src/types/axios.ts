// src/types/axios.ts
import axios from "axios";

// ✅ Hàm đọc cookie XSRF từ trình duyệt
function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
}

// ✅ Tạo instance riêng biệt
const api = axios.create({
    baseURL: "http://localhost:8000/api",     // Laravel API prefix
    withCredentials: true,                    // Quan trọng cho Sanctum
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// ✅ Hàm lấy XSRF cookie từ Laravel Sanctum
export const getCSRFToken = async () => {
    await axios.get("/sanctum/csrf-cookie", {
        withCredentials: true,
    });
};

// ✅ Interceptor: Gắn X-XSRF-TOKEN vào mỗi request
api.interceptors.request.use(config => {
    const token = getCookie("XSRF-TOKEN");
    if (token) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
        console.log("[Axios] Set X-XSRF-TOKEN:", token);
    } else {
        console.warn("[Axios] Không tìm thấy XSRF-TOKEN cookie.");
    }
    return config;
}, err => Promise.reject(err));

// ✅ Interceptor: xử lý lỗi 401
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            const authCheckEndpoints = ["/api/me", "/api/role"];
            if (authCheckEndpoints.includes(error.config.url)) {
                console.warn("[Axios] 401 - Auth endpoint, không redirect.");
            } else if (!window.location.pathname.includes("/login")) {
                console.warn("[Axios] 401 - Redirect về /login");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// ✅ Export mặc định để dùng trong toàn app
export default api;
