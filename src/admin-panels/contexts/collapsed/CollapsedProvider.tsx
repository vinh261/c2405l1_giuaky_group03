import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { CollapsedContext } from "./CollapsedContext";
import useClickOutSide from "../../../hooks/useClickOutSide";


export const CollapsedProvider = ({children}: {children: ReactNode}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktop);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCollapsed(!isDesktop);
    }, [isDesktop]);
    
    useClickOutSide([sidebarRef], () => {
        if (!isDesktop && !collapsed) {
            setCollapsed(true);
        }
    });

    const value = {
        isDesktop, collapsed, setCollapsed, sidebarRef,
    }

    return (
        <CollapsedContext.Provider value={value} >
            {children}
        </CollapsedContext.Provider>
    );
};