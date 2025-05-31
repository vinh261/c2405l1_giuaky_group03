import { forwardRef } from "react";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useCollapsed } from "../hooks/useCollapsed";
import Navbar from "../components/ui/sidebar/Navbar";
import { cn } from "../../types/cn";


const Sidebar = forwardRef<HTMLDivElement>((_, ref) => {
    const { collapsed } = useCollapsed();

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
        </aside>
    );
});

export default Sidebar;