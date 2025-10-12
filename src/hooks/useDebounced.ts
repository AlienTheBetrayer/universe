import { useEffect, useState } from "react"

export const useDebounced = <T,>(value: T, delayMs: number = 250) => {
    const [debounced, setDebounced] = useState<T>();

    useEffect(() => {
        const timeout = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(timeout);
    }, [value]);

    return debounced;
}