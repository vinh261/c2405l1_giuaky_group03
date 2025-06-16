import Button from "@/components/common/button/ButtonCustom";
import SearchBar from "@/components/common/search/SearchBar";
import { useTheme } from "@/hooks/useTheme";
import { Bell, ChevronsLeft, LogOutIcon, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router";
import type { CollapsedProps } from "@/types/models.type";
import { useAuthStore } from "@/stores/authStore";


const Header = ({ collapsed, setCollapsed }: CollapsedProps) => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const toggleTheme = () => {
        const currentTheme =
            theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : theme;

        setTheme(currentTheme === "light" ? "dark" : "light");
    };

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-[#252728]">
            <div className="flex items-center gap-x-3">
                {/* COLLAPSE SIDEBAR */}
                <button
                    className="btn-ghost size-10 cursor-pointer"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>

                {/* SEARCH */}
                <SearchBar
                    placeholder="Bạn muốn tìm món ăn nào?"
                    inputClassName="focus:bg-slate-100 focus:border-slate-200 transition-colors duration-300 dark:border-slate-600 dark:focus:border-slate-500 dark:focus:bg-gray-700 dark:text-slate-300 dark:placeholder:text-slate-400"
                />

                <div className="text-md dark:text-slate-300 flex flex-col">
                    <span className="flex gap-1">
                        Xin chào 
                        <p className="font-semibold">{user?.email}!</p>
                        Hôm nay thế nào?
                    </span>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium italic text-slate-500 dark:text-slate-400">
                            {new Date().toLocaleDateString("vi-VN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* dark mode - profile */}
            <div className="flex items-center gap-x-3">
                {/* dark mode */}
                <Button
                    className="size-10 cursor-pointer btn-ghost"
                    onClick={toggleTheme}
                >
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </Button>

                {/* notification */}
                <Button title="Thông báo" className="size-10 cursor-pointer btn-ghost">
                    <Bell size={20} />
                </Button>
                
                <Button title="Đăng xuất" onClick={() => navigate("/")} className="size-10 cursor-pointer btn-ghost">
                    <LogOutIcon size={20}/>
                </Button>
            </div>
        </header>
    );
};
export default Header;