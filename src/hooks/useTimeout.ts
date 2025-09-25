import { useEffect } from "react"

export const useTimeout = (callback: () => void, ms: number) => {
    useEffect(() => {
        const timeout = setTimeout(() => callback(), ms);
        return () => clearTimeout(timeout);
    }, [callback, ms]);
}