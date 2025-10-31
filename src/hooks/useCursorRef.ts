import { useEffect, useRef } from 'react';
import { type Position } from './useCursor';

export const useCursorRef = (defaultPos: { x: number, y: number } = { x: 0, y: 0 }) => {
    const ref = useRef<Position>(defaultPos);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            ref.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, []);

    return ref;
};
