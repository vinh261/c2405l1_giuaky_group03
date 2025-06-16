import { useCollapsed } from "@/hooks/useCollapsed";
import { cn } from "@/utils/cn";
import Sidebar from "../auth/sidebar/Sidebar";
import Header from "../auth/header/Header";
import { Outlet } from "react-router";


export const AdminLayout = () => {
    const { collapsed, setCollapsed } = useCollapsed();

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-[#1C1C1D]">
            <div className={cn("pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity", !collapsed && "max-md:pointer-events-auto max-md:opacity-30 max-md:z-50")} />

            <Sidebar />

            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}