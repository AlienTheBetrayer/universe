import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
    callback: () => void,
    exclusions?: (HTMLElement | null)[]
) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node) &&
                exclusions?.every((e) => e !== event.target)
            )
                callback();
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [callback, exclusions]);

    return ref;
};
