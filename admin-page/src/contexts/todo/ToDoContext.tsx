import { createContext } from "react";
import type { ToDoContextType } from "../../types/models.types";


export const ToDoContext = createContext<ToDoContextType | undefined>(undefined);