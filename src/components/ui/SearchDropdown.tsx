import React, { useState, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "../../types/cn";
import useClickOutSide from "../../hooks/useClickOutSide";

interface SearchDropdownProps {
    suggestions: string[];
    isOpen: boolean;
    onSelect: (value: string) => void;
    className?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
    suggestions,
    isOpen,
    onSelect,
    className,
}) => {
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation handler
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (
                highlightedIndex >= 0 &&
                highlightedIndex < suggestions.length
            ) {
                onSelect(suggestions[highlightedIndex]);
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            setHighlightedIndex(-1);
        }
    };

    // Reset highlight when suggestions or isOpen changes
    useEffect(() => {
        if (!isOpen) {
            setHighlightedIndex(-1);
        }
    }, [isOpen, suggestions]);

    useClickOutSide([containerRef], () => {
        setHighlightedIndex(-1);
    });

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={cn(
                "z-50 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800",
                className
            )}>
            <ul className="max-h-60 overflow-auto py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5 dark:border-slate-300">
                {suggestions.length === 0 ? (
                    <li className="select-none relative py-2 px-3 text-slate-700 dark:text-slate-400">
                        Không có dữ liệu
                    </li>
                ) : (
                    suggestions.map((item, index) => (
                        <li
                            key={item}
                            className={cn(
                                "cursor-pointer select-none relative py-2 pl-3 pr-9",
                                highlightedIndex === index
                                    ? "bg-slate-400 dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                                    : "text-slate-900 dark:text-slate-200"
                            )}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onMouseLeave={() => setHighlightedIndex(-1)}
                            onClick={() => onSelect(item)}>
                            <span className="block truncate">{item}</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SearchDropdown;
