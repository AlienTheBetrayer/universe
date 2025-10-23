import { useEffect, useRef } from 'react';
import { type Position } from './useCursor';

export const useCursorRef = () => {
    const ref = useRef<Position>({ x: 0, y: 0 });

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            ref.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, []);

    return ref;
};
