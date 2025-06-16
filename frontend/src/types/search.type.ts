

export type SearchProps = {
    placeholder?: string;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
    inputClassName?: string;
    iconClassName?: string;
    showClearButton?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    maxLength?: number;
    debounceDelay?: number;
    immediateSearch?: boolean;
}