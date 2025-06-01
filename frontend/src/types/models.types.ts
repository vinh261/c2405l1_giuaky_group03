import type { VariantProps } from 'class-variance-authority';
import React, { type Dispatch } from 'react';
import type { buttonVariants } from '../libs/shadcn/ButtonVariants';


// useClickOutSide:
export type Refs = React.RefObject<HTMLDivElement | null>[];
export type Callback = (e : MouseEvent) => void;


// COLLAPSE SIDEBAR:
export type CollapsedProps = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
};


// COLLAPSE CONTEXT:
export type CollapsedContextType = CollapsedProps & {
    isDesktop: boolean;
    sidebarRef: React.RefObject<HTMLDivElement | null>;
}


// THEME:
export type Theme = "dark" | "light" | "system";
export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

// TODO CONTEXT FE:
export type ToDoContextType = {
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

// FORM:
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


// SIDEBAR:
export type SidebarProps = React.HTMLProps<HTMLDivElement> & {
    collapsed: boolean;
};


// CHART:
export type TimeRange = "date" | "week" | "month" | "invalid";
// Type cho dữ liệu đầu vào (data từ ChartProvider)
export type InputVisitedProps = {
    date: string;
    visits: number;
    members: number;
    total_amount: number;
};
export interface MonthlyVisitsProps {
    month: number;
    label: string;
    visits: number;
}
// Type cho dữ liệu biểu đồ
export type TotalVisitedProps = {
    date?: string;
    week?: string;
    month?: string;
    visit: number;
};
export type VisitedChartProps = {
    data: InputVisitedProps[];
    range: DateRange;
};
export type DateRange = {
    from: Date | string | null;
    to: Date | string | null;
};
export type ChartProviderProps = {
    children: React.ReactNode;
};
export type ChartOption = {
    value: string;
    label: string;
};
export type ChartPoint = {
    label: string; 
    value: number;
}
export type ProcessedChartProps = {
    data: { label: string; value: number }[];
    xAxisKey: string;
    error?: string | null;
}
export type ChartContextType = {
    theme: string;
    currentChart: string;
    chartOptions: ChartOption[];
    isOpen: boolean;
    toggleDropdown: () => void;
    openCalendar: boolean;
    toggleButton: () => void;
    range: DateRange;
    setRange: React.Dispatch<React.SetStateAction<DateRange>>;
    handleSelect: (value: string) => void;
    handleCancel: () => void;
    handleConfirm: () => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    buttonRef: React.RefObject<HTMLDivElement | null>;
    calendarRef: React.RefObject<HTMLDivElement | null>;
    currentOption?: ChartOption;
    currentFilter: { label: string } | undefined;
    filteredData: InputVisitedProps[]; // Thay Record<string, unknown>[] bằng InputVisitedProps[]
    today: Date;
    startOfMonth: Date;
    tempRange: DateRange;
    setTempRange: React.Dispatch<React.SetStateAction<DateRange>>;
    footerRef: React.RefObject<HTMLDivElement> | null;
};


// SHADCN:
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}


// CALENDAR BUTTON:
export type CalendarButtonProps = {
    onConfirm: () => void; 
    onCancel: () => void;
}