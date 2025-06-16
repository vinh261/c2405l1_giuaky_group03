import client from "./client";
import type { AuthResponse, LoginCredentials, RegisterCredentials, UserResponse } from "@/types/api.types";
import type { Profile } from "@/types/auth.types";
import axios from "axios";


export const authService = {
    // Get CSRF cookie trước khi login/register
    async getCsrfCookie() {
        try {
            await client.get("/sanctum/csrf-cookie");
            await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
            console.error("Failed to get CSRF cookie:", error);
            if (axios.isAxiosError(error)) {
                console.error("Error details:", error.response);
            }
            throw error;
        }
    },

    // Login
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        await this.getCsrfCookie();
        try {
            const response = await client.post<{ user: AuthResponse }>(
                '/api/login', 
                credentials
            );
            return response.data.user;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login error:', error.response?.data);
            }
            throw error;
        }
    },

    // Register
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        await this.getCsrfCookie();
        const response = await client.post<AuthResponse>(
            "/api/register",
            credentials
        );
        return response.data;
    },

    // Logout
    async logout(): Promise<void> {
        await client.post("/api/user/logout");
    },

    // Get current user (đã có trong checkAuth của store)
    async getCurrentUser(): Promise<UserResponse> {
        const response = await client.get<UserResponse>("/api/me");
        return response.data;
    },

    // Update profile
    async updateProfile(data: Partial<Profile>): Promise<Profile> {
        const response = await client.put<Profile>(`/api/admin/profile/${data.profile_id}`, data);
        return response.data;
    },

    // Forgot password - send reset link
    async forgotPassword(email: string): Promise<{ message: string }> {
        await this.getCsrfCookie();
        const response = await client.post<{ message: string }>(
            "/api/forgot-password",
            { email }
        );
        return response.data;
    },

    // Reset password with token
    async resetPassword(data: {
        token: string;
        email: string;
        password: string;
        password_confirmation: string;
    }): Promise<{ message: string }> {
        await this.getCsrfCookie();
        const response = await client.post<{ message: string }>(
            "/api/reset-password",
            data
        );
        return response.data;
    },
};