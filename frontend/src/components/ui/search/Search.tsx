import useDelaySearch from "@/hooks/useSearch";
import { cn } from "@/libs/utils";
import type { SearchProps } from "@/types/models.types";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const Search: React.FC<SearchProps> = ({
    placeholder = "",
    onSearch,
    onClear,
    value: controlledValue,
    className = "",
    inputClassName = "",
    iconClassName = "",
    showClearButton = true,
    autoFocus = false,
    disabled = false,
    maxLength = 100,
    debounceDelay = 300,
}) => {
    const [ internalValue, setInternalValue ] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Use controlled value if provided, otherwise use internal state
    const value =
        controlledValue !== undefined ? controlledValue : internalValue;
    const debouncedValue = useDelaySearch(value, debounceDelay);

    // Handle debounced search
    useEffect(() => {
        if (debouncedValue && onSearch) {
            onSearch(debouncedValue);
        }
    }, [debouncedValue, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // Immediate callback for controlled components
        if (onSearch && controlledValue !== undefined) {
            onSearch(newValue);
        }
    };

    const handleClear = () => {
        if (controlledValue === undefined) {
            setInternalValue("");
        }

        if (onClear) {
            onClear();
        } else if (onSearch) {
            onSearch("");
        }

        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            handleClear();
        }
    };

    return (
        <div className={cn("relative flex items-center", {className})}>
            {/* Search Icon */}
            <div className="absolute left-3 pointer-events-none">
                <SearchIcon
                    size={20}
                    className={cn("text-gray-400", iconClassName)}
                />
            </div>

            {/* Input Field */}
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={
                    cn("w-full pl-10 pr-10 py-2 bg-transparent border border-gray-300 rounded-lg outline-none focus:border-slate-400 focus:bg-white transition-all disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-slate-300", inputClassName)
                }
                autoFocus={autoFocus}
                disabled={disabled}
                maxLength={maxLength}
            />

            {/* Clear Button */}
            {showClearButton && value && !disabled && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    type="button"
                    aria-label="Clear search">
                    <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
            )}
        </div>
    );
};
export default Search;