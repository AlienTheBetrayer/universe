import { useEffect, useRef } from "react"

export const useCursor = () => {
    const pos = useRef({x: 0, y: 0});

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', e => handle(e));
        return () => window.removeEventListener('mousemove', handle);
    }, []);

    return pos;
}