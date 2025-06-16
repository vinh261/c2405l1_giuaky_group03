import type { buttonVariants } from '@/libs/shadcn/button-variant';
import type { VariantProps } from 'class-variance-authority';


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
export type MonthlyVisitsProps = {
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
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
        VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}

// CALENDAR BUTTON:
export type CalendarButtonProps = {
    onConfirm: () => void; 
    onCancel: () => void;
}

// SEARCH:
export type SearchProps = {
    placeholder?: string;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    value?: string;
    className?: string;
    inputClassName?: string;
    iconClassName?: string;
    showClearButton?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    maxLength?: number;
    debounceDelay?: number;
}

// FILTER:
export type FilterConfig = {
    id: string;
    label: string;
    type: 'buttons' | 'range';
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    unit?: string;
    columns?: number; // Số cột cho grid
}
export type FilterProps = {
    filterConfig: FilterConfig[];
    onApplyFilter: (filters: Record<string, unknown>) => void;
    buttonText?: string;
    modalTitle?: string;
}

// PAGINATE:
export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}