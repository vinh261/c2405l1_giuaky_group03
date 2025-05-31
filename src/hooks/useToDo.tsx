import { useContext } from "react";
import { ToDoContext } from "../contexts/todo/ToDoContext";

export const useToDo = () => {
    const context = useContext(ToDoContext);

    if (context === undefined)
        throw new Error("useChart must be used within a ToDoProvider");

    return context;
};