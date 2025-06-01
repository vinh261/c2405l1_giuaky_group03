import React from "react";
import { NavLink } from "react-router";
import { useCollapsed } from "../../../hooks/useCollapsed";
import { NavItem } from "../../data/sidebar/NavItem";
import { cn } from "../../../../types/cn";

const Navbar = () => {
    const { collapsed } = useCollapsed();

    return (
        <React.Fragment>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:none]">
                {NavItem.map((item) => (
                    <nav key={item.title} className={cn("sidebar-group", collapsed && "md:items-center")}>
                        {<p className={cn("sidebar-group-title", collapsed && "md:w-[45px] text-center")}>
                            {!collapsed ? (item.title) : (item.line)}
                        </p>}

                        {item.link.map((link) => (
                            <NavLink 
                                key={link.label} 
                                to={link.path} 
                                end 
                                className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                            >
                                <link.icon size={20} className="shrink-0" />
                                {!collapsed && <p className="whitespace-no-wrap">{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </React.Fragment>
    );
};

export default Navbar;
