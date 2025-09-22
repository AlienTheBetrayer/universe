import { useEffect, useRef } from "react"

interface Position {
    x?: number;
    y?: number;
};

export const useCursor = (defaultPosition?: Position) => {
    const pos = useRef({x: defaultPosition?.x ?? 0, y: defaultPosition?.y ?? 0});

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', e => handle(e));
        return () => window.removeEventListener('mousemove', handle);
    }, []);

    return pos;
}