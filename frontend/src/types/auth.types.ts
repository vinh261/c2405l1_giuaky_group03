

export type User = {
    user_id: string;
    email: string;
    profile?: Profile;
}
export type Profile = {
    profile_id: string;
    user_name: string;
    phone?: string;
    image?: string;
    status?: string;
    gender?: string;
    dob?: string;
    job?: string;
    height?: number;
    weight?: number;
    address?: string;
    note?: string;
    role?: string;
    user?: User;
}

// State of auth
export type AuthState = {
    user: User | null;
    role: string | undefined; // Role có thể là null nếu chưa đăng nhập
    isLogged: boolean;

    // Actions
    setAuth: (data: {user: User | null}) => void;
    clearAuth: () => void;
    updateProfile: (profileData: Partial<Profile>) => void;
    checkAuth: () => Promise<void>; // Hàm để kiểm tra auth ban đầu
}


// ============================================= admin ========================


// Admin sidebar item type
export type TabType =
    | "dashboard"
    | "users"
    | "meals"
    | "categories"
    | "tags"
    | "reviews"
    | "favorites"
    | "blogs";

export type SidebarItem = {
    id: TabType;
    label: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    path?: string; // Optional path for navigation
}

// Dashboard statistics data type
export type DashboardStatsData = {
    users: {
        total: number;
        new_this_month: number;
        growth: number;
    };
    meals: {
        total: number;
        by_category: Record<string, number>;
    };
    favorites: {
        total: number;
        most_favorited: Array<{
            meal_name: string;
            count: number;
        }>;
    };
    reviews: {
        total: number;
        average_rating: number;
        recent_count: number;
    };
}

export type UserManage = {
    user_id: string;
    email: string;
    created_at: string;
    profile: {
        profile_id: string;
        user_name: string;
        role: "admin" | "user";
        phone?: string;
        image?: string;
    };
    stats: {
        meals_count: number;
        favorites_count: number;
        reviews_count: number;
    };
}