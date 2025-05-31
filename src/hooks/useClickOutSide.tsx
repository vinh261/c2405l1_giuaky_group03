import { useEffect } from "react";
import type { Callback, Refs } from "../types/models.types";


const useClickOutSide = (refs: Refs, callback: Callback) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isOutside = refs.every((ref) => !ref.current?.contains(event.target as Node));

            if (isOutside && typeof callback === "function") {
                callback(event);
            }
        }
        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [refs, callback]);
};

export default useClickOutSide;
