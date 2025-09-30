import { useEffect, useState } from "react";
import { useTimeout } from "../../../hooks/useTimeout";
import { useSessionStore } from "../../../zustand/sessionStore";

export const useHeaderAnimation = () => {
    const { loaded, updateLoaded } = useSessionStore();
    const [justified, setJustified] = useState<boolean>(false);   
    
    useTimeout(() => {
        if (!loaded.header)
            updateLoaded({ header: true });
    }, 4100);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setJustified(loaded.header);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [loaded.header]);

    return { loaded, justified };
}