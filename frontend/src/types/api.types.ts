import type { Profile } from "./auth.types";


// API response types
export type ApiResponse<T = unknown> = {
    success: boolean;
    data: T;
    message?: string;
}
export type AuthResponse = {
    user_id: string;
    email: string;
}
export type UserResponse = {
    user: {
        user_id: string;
        email: string;
        profile: Profile;
    }
}

// Error handling types
export type ApiError = {
    response?: {
        data?: {
            message?: string;
            errors?: Record<string, string[]>;
        };
        status?: number;
    };
    message?: string;
};
export type ApiErrors = {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
}

// Authentication types
export type LoginCredentials = {
    email: string;
    password: string;
    remember?: boolean;
};
export type RegisterCredentials = {
    email: string;
    password: string;
    password_confirmation: string;
};
