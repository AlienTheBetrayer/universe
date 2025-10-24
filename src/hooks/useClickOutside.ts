import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(callback: () => void) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node))
                callback();
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [callback]);

    return ref;
};
