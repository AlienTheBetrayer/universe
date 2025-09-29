import { useEffect } from "react";
import { useLocalStore } from "./localStore";

export const StoreWatcher = () => {
    const { theme } = useLocalStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    return null;
}