import { useEffect, useState } from "react";
import type { useCircleGrid } from "./useCircleGrid";

export const useCircleGridHotkeys = (data: ReturnType<typeof useCircleGrid>) => {
    const [focused, setFocused] = useState<boolean>(false);
    
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(!focused)
                return;

            switch(e.key.toLowerCase()) {
                case 'arrowleft':
                    data.unshift();
                break;
                case 'arrowright':
                    data.shift();
                break;
                case 'f':
                    data.reverse();
                break;
                case 'r':
                    data.random();
                break;
            }
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [focused]);

    return { focused, setFocused };
}