import { useCollapsed } from "@/hooks/useCollapsed";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import Navbar from "./Navbar";
import logoDark from "@/assets/images/shortcut-icons/logo-dark.svg";
import logoLight from "@/assets/images/shortcut-icons/logo-light.svg";
import Button from "@/components/common/button/ButtonCustom";
import { Home, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/react-query/useAuthQuery";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const Sidebar = forwardRef<HTMLDivElement>((_, ref) => {
    const { collapsed } = useCollapsed();
    const logoutMutation = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            logoutMutation.mutate();
            toast.success("Đăng xuất thành công");
            navigate("/");
        } catch {
            toast.error("Đăng xuất không thành công");
        }
    };

    return (
        <aside ref={ref} className={cn("fixed z-100 flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:width_300ms_cubic-bezier(0.4,0,0.2,1),left_300ms_cubic-bezier(0.4,0,0.2,1),background-color_150ms_cubic-bezier(0.4,0,0.2,1),border_150ms_cubic-bezier(0.4,0,0.2,1)] dark:border-slate-700 dark:bg-[#252728]", collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]", collapsed ? "max-md:-left-full" : "max-md:left-0")}>
            {/* LOGO BRAND */}
            <div className="flex gap-x-3 p-4">
                <img src={logoDark} alt="logo sidebar" className="dark:hidden w-[24px] h-[28px]"/>
                <img src={logoLight} alt="logo sidebar" className="hidden dark:block w-[24px] h-[28px]"/>
                {!collapsed && <p className="text-lg font-bold text-slate-900 transition-colors dark:text-slate-100 whitespace-nowrap">Duc Hieu</p>}
            </div>

            {/* NAV */}
            <Navbar />

            {/* FOOTER */}
            <div className="grid gap-2 px-3 py-4 dark:text-slate-300 mt-4">
                <Button
                    className="border border-slate-300 hover:bg-blue-200 transition-colors duration-300 dark:hover:text-blue-600  dark:border-slate-700"
                    onClick={() => navigate("/")}
                >
                    <Home />
                    Về trang chủ
                </Button>
                <Button
                    className="border border-slate-300 hover:bg-red-200 transition-colors duration-300 dark:hover:text-red-500  dark:border-slate-700"
                    onClick={handleLogout}
                >
                    <LogOut />
                    Đăng xuất
                </Button>
            </div>
        </aside>
    );
});
export default Sidebar;
