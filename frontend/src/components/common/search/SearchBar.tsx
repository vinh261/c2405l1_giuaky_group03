import { cn } from "@/utils/cn";
import { useSearchBarLogic } from "./useSearchBarLogic";
import { SearchIcon, X } from "lucide-react";
import type { SearchProps } from "@/types/search.type";


const SearchBar = (props: SearchProps) => {
    const { 
        className, iconClassName, inputRef, value, handleChange, handleKeyDown, placeholder, inputClassName, autoFocus,
        disabled, maxLength, showClearButton, handleClear,
    } = useSearchBarLogic(props);

    return (
        <div className={cn("relative flex items-center", className)}>
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
}
export default SearchBar;