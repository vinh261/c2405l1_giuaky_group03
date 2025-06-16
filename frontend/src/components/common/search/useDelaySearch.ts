import { useEffect, useState } from "react";


const useDelaySearch = (value: string, delay: number) => {
    const [delayValue, setDelayValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDelayValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return delayValue;
};
export default useDelaySearch;
