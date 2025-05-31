import { Outlet } from "react-router";
import { ChartProvider } from "./contexts/chart/ChartProvider";
import { useCollapsed } from "./hooks/useCollapsed";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import { cn } from "../types/cn";


const Layout = () => {
    const { collapsed, setCollapsed } = useCollapsed();

    return (
        <ChartProvider>
            <div className="min-h-screen bg-slate-100 transition-colors dark:bg-[#1C1C1D]">
                <div className={cn("pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity", !collapsed && "max-md:pointer-events-auto max-md:opacity-30 max-md:z-50")}></div>

                <Sidebar />

                <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                    <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </ChartProvider>
    );
};

export default Layout;