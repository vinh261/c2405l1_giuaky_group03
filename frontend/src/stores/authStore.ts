import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AuthState, Profile, User } from "@/types/auth.types";
import client from "@/services/api/client";
import type { UserResponse } from "@/types/api.types";

/**
 * zustand auth store
 */
export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                role: '',
                isLogged: false,

                setAuth: (data) => {
                    set({
                        user: data.user,
                        isLogged: true,
                    });
                },

                clearAuth: () => {
                    set({
                        user: null,
                        isLogged: false,
                    });
                },

                updateProfile: (profileData: Partial<Profile>) => {
                    set((state) => {
                        // Guard clause
                        if (!state.user) return state;

                        // Explicit type for new state
                        const newState: Partial<AuthState> = {
                            user: {
                                ...state.user,
                                profile: state.user.profile 
                                    ? { ...state.user.profile, ...profileData }
                                    : profileData
                            } as User
                        };

                        return newState;
                    });
                },

                checkAuth: async () => {
                    try {
                        // Gọi /api/me để lấy thông tin user và role
                        const response = await client.get<UserResponse>("/api/me");
                        const userData  = response.data.user;
                        const userToStore: User = {
                            user_id: userData.user_id,
                            email: userData.email,
                            profile: userData.profile || undefined,
                        };

                        set({
                            user: userToStore,
                            isLogged: true,
                            role: userData.profile.role || "user",
                        });
                    } catch (error) {
                        set({ 
                            user: null, 
                            isLogged: false, 
                            role: '' 
                        });
                        throw error;
                    }
                },
            }),
            {
                name: "auth-store",
                partialize: (state) => ({
                    // Chỉ lưu những gì cần thiết
                    isLogged: state.isLogged,
                    // role: state.role,
                }),
                // version: 1, // Thêm version để force clear old data
            }
        )
    )
);
