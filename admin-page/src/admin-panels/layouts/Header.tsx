import { Bell, ChevronsLeft, LogOutIcon, Moon, Sun } from "lucide-react";
import profile from "../assets/images/profile.png";
import { useTheme } from "../../hooks/useTheme";
import { CommandSearch } from "../../components/CommandSearch";
import type { CollapsedProps } from "../../types/models.types";
import { useNavigate } from "react-router";


const Header = ({ collapsed, setCollapsed }: CollapsedProps) => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

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

                {/* COMMAND SEARCH */}
                <CommandSearch />
            </div>

            {/* dark mode - profile */}
            <div className="flex items-center gap-x-3">
                {/* dark mode */}
                <button
                    className="btn-ghost size-10 cursor-pointer"
                    onClick={toggleTheme}
                >
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button>

                {/* notification */}
                <button title="Thông báo" className="btn-ghost size-10 cursor-pointer">
                    <Bell size={20} />
                </button>

                {/* profile */}
                <button className="size-10 overflow-hidden rounded-full cursor-pointer">
                    <img src={profile} alt="Profile" className="size-full object-cover" />
                </button>
                
                <button title="Đăng xuất" onClick={() => navigate("/")} className="btn-ghost size-10 cursor-pointer">
                    <LogOutIcon size={20}/>
                </button>
            </div>
        </header>
    );
};

export default Header;
