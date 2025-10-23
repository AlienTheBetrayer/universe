import { useEffect, useState } from 'react';

export interface Position {
    x: number;
    y: number;
}

export const useCursor = (defaultPosition?: Position) => {
    const [pos, setPos] = useState<Position>(defaultPosition ?? { x: 0, y: 0 });

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, []);

    return pos;
};
