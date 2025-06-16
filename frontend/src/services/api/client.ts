import axios, { AxiosError } from "axios";
import type { ApiError } from "@/types/api.types";


// Base URL từ env hoặc default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

console.log("API Base URL:", API_BASE_URL);

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'X-Requested-With': 'XMLHttpRequest', // Quan trọng để Laravel biết đây là AJAX request
    },
    withCredentials: true, // QUAN TRỌNG: để gửi cookies
    timeout: 10000, // Thêm timeout để debug
});


// Response interceptor với logging chi tiết
// client.interceptors.response.use(
//     (response) => {
//         console.log("✅ Response received:", response.status, response.statusText);
//         console.log("Response headers:", response.headers);
//         console.log("Response data:", response.data);
//         return response;
//     },
//     async (error: AxiosError<ApiError>) => {
//         console.error("❌ Response error status:", error.response?.status);
//         console.error("❌ Response error statusText:", error.response?.statusText);
//         console.error("❌ Response error headers:", error.response?.headers);
//         console.error("❌ Response error data:", error.response?.data);
//         console.error("❌ Response error config URL:", error.config?.url);
//         console.error("❌ Full error object:", error);

//         // Đặc biệt log 302 redirect
//         if (error.response?.status === 302) {
//             console.error("🔄 302 REDIRECT DETECTED!");
//             console.error("Redirect Location:", error.response?.headers?.location);
//             console.error("Original request URL:", error.config?.url);
//             console.error("Original request method:", error.config?.method);
//         }

//         // Nếu lỗi 419 (CSRF token mismatch), thử lấy CSRF cookie mới
//         if (error.response?.status === 419) {
//             console.log("🔄 Retrying with new CSRF token...");
//             await client.get("/sanctum/csrf-cookie");
//             if (error.config) {
//                 return client.request(error.config);
//             }
//         }

//         // Nếu lỗi 401 (Unauthorized) hoặc 302 (Redirect)
//         if (error.response?.status === 401 || error.response?.status === 302) {
//             console.log("🚪 Authentication error, clearing auth state");
//             const authStore = (
//                 await import("@/stores/authStore")
//             ).useAuthStore.getState();
//             authStore.clearAuth();
//         }
        
//         return Promise.reject(error);
//     }
// );

// Request interceptor để add XSRF token
client.interceptors.request.use(
    (config) => {
        console.log("Making request to:", config.url);
        console.log("Request method:", config.method);
        
        // Log cookies trước khi lấy token
        const allCookies = document.cookie;
        console.log("All cookies:", allCookies);

        // Lấy XSRF token từ cookie
        const token = allCookies
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];

        if (token) {
            const decodedToken = decodeURIComponent(token);
            config.headers["X-XSRF-TOKEN"] = decodedToken;
            console.log("✅ XSRF token added to request");
        } else {
            console.log("❌ No XSRF token found in cookies");
            console.log("Available cookies:", allCookies.split('; '));
        }

        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor để handle errors
client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
        // Nếu lỗi 419 (CSRF token mismatch), thử lấy CSRF cookie mới
        if (error.response?.status === 419) {
            await client.get("/sanctum/csrf-cookie");
            // Retry request với token mới
            if (error.config) {
                return client.request(error.config);
            }
        }

        // Nếu lỗi 401 (Unauthorized) hoặc 302 (Redirect)
        if (error.response?.status === 401 || error.response?.status === 302) {
            // Clear auth state nếu cần
            const authStore = (
                await import("@/stores/authStore")
            ).useAuthStore.getState();
            authStore.clearAuth();
        }
        return Promise.reject(error);
    }
);
export default client;
