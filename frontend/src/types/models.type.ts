
// THEME
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

// COLAPPSED CONTEXT TYPES
export type CollapsedProps = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
};
export type CollapsedContextType = CollapsedProps & {
    isDesktop: boolean;
    sidebarRef: React.RefObject<HTMLDivElement | null>;
}

// CHART TYPES
export type TimeRange = "date" | "week" | "month" | "invalid";
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

// CHART CONTEXT TYPES
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


// CALENDAR BUTTON:
export type CalendarButtonProps = {
    onConfirm: () => void; 
    onCancel: () => void;
}