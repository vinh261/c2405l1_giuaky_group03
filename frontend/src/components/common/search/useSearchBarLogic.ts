import type { SearchProps } from "@/types/search.type";
import { useEffect, useRef, useState } from "react";
import useDelaySearch from "./useDelaySearch";


export const useSearchBarLogic = (props: SearchProps) => {
    const {
        placeholder = "",
        onSearch,
        onClear,
        onChange,
        value: controlledValue,
        className = "",
        inputClassName = "",
        iconClassName = "",
        showClearButton = true,
        autoFocus = false,
        disabled = false,
        maxLength = 100,
        debounceDelay = 300,
        immediateSearch = false,
    } = props;

    const [ internalValue, setInternalValue ] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Use controlled value if provided, otherwise use internal state
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const debouncedValue = useDelaySearch(value, debounceDelay);

    // Handle debounced search
    useEffect(() => {
        if (debouncedValue && onSearch) {
            onSearch(debouncedValue);
        }
    }, [debouncedValue, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Update internal state for uncontrolled components
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // Real-time onChange
        if (onChange) {
            onChange(newValue);
        }

        // Immediate search option
        if (onSearch && immediateSearch) {
            onSearch(newValue);
        }

        // Immediate callback for controlled components
        if (onSearch && controlledValue !== undefined) {
            onSearch(newValue);
        }
    };

    const handleClear = () => {
        const clearedValue = "";

        if (controlledValue === undefined) {
            setInternalValue(clearedValue);
        }

        // ✅ Call onChange when clearing
        if (onChange) {
            onChange(clearedValue);
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

    return {
        className, iconClassName, inputRef, value, handleChange, handleKeyDown, placeholder, inputClassName, autoFocus,
        disabled, maxLength, showClearButton, handleClear,
    }
}