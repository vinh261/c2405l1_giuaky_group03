import type { CollapsedContextType } from "@/types/models.type";
import { createContext } from "react";

export const CollapsedContext = createContext<CollapsedContextType | undefined>(undefined);