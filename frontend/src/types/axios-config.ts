import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

// Get CSRF token
export const getCsrfToken = async () => {
    try {
        await axiosInstance.get("/sanctum/csrf-cookie");
    } catch (error) {
        console.error("Error getting CSRF token:", error);
    }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        if (
            ["post", "put", "patch", "delete"].includes(
                config.method?.toLowerCase() || ""
            )
        ) {
            await getCsrfToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const protectedPaths = ["/api/user/", "/api/admin/"];
            const isProtectedRoute = protectedPaths.some((path) =>
                error.config.url?.includes(path)
            );

            if (isProtectedRoute) {
                window.location.href = "/login";
            }
        }

        if (error.response?.status === 419) {
            await getCsrfToken();
            return axiosInstance.request(error.config);
        }

        return Promise.reject(error);
    }
);