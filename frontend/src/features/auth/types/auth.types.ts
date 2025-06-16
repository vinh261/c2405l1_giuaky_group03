import type { Dispatch } from "react";


// AUTH CONTEXT FE:
export type AuthContextType = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    isLogged: boolean;
    loading: boolean;
    setLoading: (value: boolean) => void;
    errorMessage: string;
    setErrorMessage: (msg: string) => void;
    setIsLogged: (value: boolean) => void;
    handleClick: () => void;
    toggleTheme: () => void;
    forgotPassword: boolean;
    setForgotPassword: (value: boolean) => void;
    role: string | null;
    handleLogin: (userData: UserData) => void;
    handleLogout: () => void;
    profile: FormProps | null;
    setProfile: Dispatch<React.SetStateAction<FormProps | null>>;
    authCheck: boolean;
    setAuthCheck: Dispatch<React.SetStateAction<boolean>>;
    memberList: FormProps[];
    setMemberList: Dispatch<React.SetStateAction<FormProps[]>>;
    displayedMembers: FormProps[];
    handleSearch: (search: string) => void;
    search: string;
    handleSearchSubmit: (event?: React.FormEvent) => void;
    suggestions: string[];
    handleSuggest: (value: string) => void;
    handleSort: (value: string) => void;
    sortField: string;
    sortOrder: "asc" | "desc";
    memberView: FormProps | null;
    setMemberView: React.Dispatch<React.SetStateAction<FormProps | null>>;
    openView: boolean;
    setOpenView: (value: boolean) => void;
    editedData: FormProps | null;
    setEditedData: (value: FormProps | null) => void;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    deleteMember: (profile_id: string) => void;
};

export type FormProps = {
    profile_id: string;
    user_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    user: {
        email: string;
        email_verified_at: string | null;
    };
    phone: string;
    gender: string;
    address: string;
    role: string;
    image:  string;
    status: string;
    dob: Date | string | null;
    job: string;
    height: string;
    weight: string;
    note: string;
    created_at: Date;
};
export interface UserData {
    user_id: string;
    email: string;
    profile: FormProps | null; // Profile có thể là null
    role: string;
}
export interface ProfileResponse {
    success: boolean;
    message: string;
    data: {
        data: FormProps[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
}
export type ForgotPasswordModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (email: string) => Promise<void>;
}
export type ResetFormProps = {
    email: string;
    password: string;
    password_confirmation: string;
};