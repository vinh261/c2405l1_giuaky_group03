import {
    Calculator,
    Calendar,
    CreditCard,
    Search,
    Settings,
    Smile,
    User,
} from "lucide-react";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "../libs/shadcn/Command";
import useClickOutSide from "../hooks/useClickOutSide";
import { cn } from "../types/cn";

export function CommandSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const commandRef = useRef<HTMLDivElement>(null);
    const commandInputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useClickOutSide([commandRef, triggerRef], () => setIsOpen(false));

    // Focus CommandInput khi mở
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                commandInputRef.current?.focus();
            }, 0);
        }
    }, [isOpen]);

    return (
        <React.Fragment>
            {/* INPUT */}
            <div
                className="input"
                ref={triggerRef}
                onClick={() => setIsOpen(true)}>
                <Search size={20} className="text-slate-400" />
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Bạn cần tìm gì ?"
                    className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-400 placeholder:text-sm dark:text-slate-50"
                    readOnly
                />
            </div>

            {/* command modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
                    <div
                        ref={commandRef}
                        className={cn(
                            "w-full max-w-md",
                            theme === "light"
                                ? "text-slate-900"
                                : "text-slate-50"
                        )}>
                        <Command className="rounded-lg border shadow-md md:min-w-[320px] h-80 bg-slate-100 dark:bg-(--primary-bg-dark)">
                            <CommandInput
                                ref={commandInputRef}
                                placeholder="Bạn cần tìm gì ?"
                            />
                            <CommandList>
                                <CommandEmpty>
                                    Không tìm thấy kết quả.
                                </CommandEmpty>
                                <CommandGroup heading="Gợi ý tìm kiếm">
                                    <CommandItem>
                                        <Calendar />
                                        <span>Calendar</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Smile />
                                        <span>Search Emoji</span>
                                    </CommandItem>
                                    <CommandItem disabled>
                                        <Calculator />
                                        <span>Calculator</span>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem>
                                        <User />
                                        <span>Profile</span>
                                        <CommandShortcut>⌘P</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <CreditCard />
                                        <span>Billing</span>
                                        <CommandShortcut>⌘B</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <Settings />
                                        <span>Settings</span>
                                        <CommandShortcut>⌘S</CommandShortcut>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
