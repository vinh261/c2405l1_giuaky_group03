import { createContext } from "react";
import type { CollapsedContextType } from "../../../types/models.types";


export const CollapsedContext = createContext<CollapsedContextType | undefined>(undefined);