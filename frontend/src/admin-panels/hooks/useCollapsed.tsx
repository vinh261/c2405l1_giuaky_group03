import { useContext } from "react"
import { CollapsedContext } from "../contexts/collapsed/CollapsedContext"


export const useCollapsed = () => {
    const context = useContext(CollapsedContext);

    if (context === undefined)
        throw new Error("useCollapsed must be used within a CollapsedProvider");

    return context;
}