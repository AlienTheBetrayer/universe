import { useEffect } from "react";
import { useLocalStore } from "./localStore";

export const StoreWatcher = () => {
    const localStore = useLocalStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', localStore.theme);
    }, [localStore.theme]);
    
    return null;
}