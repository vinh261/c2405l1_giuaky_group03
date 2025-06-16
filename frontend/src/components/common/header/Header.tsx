import { NavLink } from "react-router";
import logo from "@/assets/images/logo-healthy.png"
import { navItemHeader } from "../navbar/navItem";
import { formatImage } from "@/utils/helpers/format.helper";
import { LogOutIcon } from "lucide-react";
import { useHeaderLogic } from "./useHeaderLogic";


const Header = () => {
    const { navigate, isLogged, user, handleLogout } = useHeaderLogic();

    return (
        <header className="flex justify-around h-[60px] items-center text-lg transition-colors fixed top-2 w-full z-999999 text-slate-200">
            <div className="container h-full flex justify-between bg-slate-900/90 backdrop-blur-[4px] rounded-full pl-2 pr-7">
                <img src={logo} alt="Logo Healthy" className="object-cover cursor-pointer"/>

                <nav className="flex w-1/2 justify-evenly">
                    {navItemHeader.map((items, index) => (
                        <div key={index} className="text-center content-center">
                            <NavLink to={items.path} end className="menu-item font-medium outline-0">
                                {items.label}
                            </NavLink>
                        </div>
                    ))}
                </nav>

                <div className="flex justify-center items-center">
                    {isLogged && user?.profile ? (
                        // Profile
                        <div className="relative flex items-center p-1 justify-end group">
                            <div className="size-10 overflow-hidden rounded-full cursor-pointer" >
                                <img src={formatImage(user.profile.image)} alt="Avatar" className="size-full object-cover" />

                                {/* Dropdown */}
                                <div className="absolute rounded-md hidden group-hover:block text-center w-40 py-1 px-2 text-base right-0 top-full bg-slate-500 text-md">
                                    <p className="border-b border-dashed border-slate-300 py-2" onClick={() => {
                                        navigate(user.profile?.role === "admin" ? "/admin" : "/profile");
                                    }}
                                    >
                                        Thông tin tài khoản
                                    </p>
                                    <p className="border-b border-dashed border-slate-300 py-2" onClick={() => {
                                        navigate("/favorites");
                                    }}
                                    >
                                        Danh sách yêu thích
                                    </p>
                                    <p className="py-2 flex justify-center items-center gap-x-2" onClick={handleLogout}>Đăng xuất <LogOutIcon size={16}/></p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-x-4">
                            <button 
                                className="hover:underline hover:text-[var(--nav-hover)] underline-offset-6 decoration-2" 
                                onClick={() => navigate("/login")}
                            >
                                Đăng nhập
                            </button>

                            <button 
                                className="hover:underline hover:text-[var(--nav-hover)] underline-offset-6 decoration-2" 
                                onClick={() => navigate('/register')}
                            >
                                Đăng ký
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
};
export default Header;