import { NavItem } from "../components/ui/header/NavItem";
import { Link, NavLink, useNavigate } from "react-router";
import { cn } from "../types/cn";
import logo from "../assets/images/logo-healthy.png";
import { LogOutIcon, Moon, Sun } from "lucide-react";
import { useToDo } from "../hooks/useToDo";
import { formatImage } from "../admin-panels/utils/formatData";


const Header = () => {
    const { toggleTheme, isLogged, handleLogout, role, profile } = useToDo();
    const navigate = useNavigate();

    return (
        <header className="flex justify-between px-10 h-[60px] shadow-lg text-base items-center text-slate-800 bg-white transition-colors dark:text-slate-300 dark:bg-(--sub-bg-dark)">
            <img src={logo} alt="Logo Healthy" className="object-cover h-full cursor-pointer"/>

            <nav className="flex w-1/2">
                {NavItem.map((items, index) => (
                    <div key={index} className="relative w-full py-2 group text-center content-center">
                        <NavLink to={items.path} end className="menu-item text-lg font-medium">
                            {items.label}
                        </NavLink>

                        {items.children && (
                            <div className={cn("menu-item-dropdown absolute w-full left-0 top-10 hidden group-hover:block bg-slate-500 shadow-lg rounded text-left px-3 py-1")}>
                                {items.children.map((child, childrenIndex) => (
                                    <Link key={childrenIndex} to={child.path} className={cn("hidden group-hover:block p-3", childrenIndex < items.children.length - 1 && "border-b border-dashed border-slate-300")}>
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="flex items-center justify-center w-[12%]">
                {isLogged && profile ? (
                    // Profile
                    <div className="relative flex items-center p-1 w-[80%] justify-center group">
                        <div className="size-10 overflow-hidden rounded-full cursor-pointer" >
                            <img src={formatImage(profile.image)} alt="Avatar" className="size-full object-cover" />

                            {/* Dropdown */}
                            <div className="absolute rounded-md hidden group-hover:block text-center w-40 py-1 px-2 text-sm left-2 top-12 bg-slate-500">
                                <p className="border-b border-dashed border-slate-300 py-2" onClick={() => {
                                    navigate(role === "admin" ? "/admin" : "/profile");
                                }}>Thông tin tài khoản</p>
                                <p className="py-2 flex justify-center items-center gap-x-2" onClick={handleLogout}>Đăng xuất <LogOutIcon size={16}/></p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-x-4">
                        <button className="hover:underline underline-offset-6 decoration-2" onClick={() => navigate("/login")}>
                            Đăng nhập
                        </button>

                        <button className="hover:underline underline-offset-6 decoration-2" onClick={() => navigate('/register')}>
                            Đăng ký
                        </button>
                    </div>
                )}

                {/* Theme Toggle */}
                <button className="btn-ghost size-10 cursor-pointer fixed left-[calc(100%-80px)]" onClick={toggleTheme}>
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button>
            </div>
        </header>
    )
};

export default Header;
