import { useEffect, useState } from "react"

export interface Viewport {
    innerWidth: number;
    innerHeight: number;
}

export const useViewport = () => {
    const [viewport, setViewport] = useState<Viewport>({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });

    useEffect(() => {
        const handle = () => {
            setViewport({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
        }

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);

    return viewport;
}