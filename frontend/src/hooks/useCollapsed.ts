import { CollapsedContext } from "@/contexts/CollapsedContext";
import { useContext } from "react"


export const useCollapsed = () => {
    const context = useContext(CollapsedContext);

    if (context === undefined)
        throw new Error("useCollapsed must be used within a CollapsedProvider");

    return context;
}