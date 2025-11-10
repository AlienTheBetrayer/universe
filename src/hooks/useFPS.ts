import { useRef } from 'react';

export const useFPS = (onUpdate: (fps: number) => void) => {
    const frames = useRef<number>(0);
    const last = useRef(performance.now());

    const update = () => {
        const now = performance.now();
        frames.current++;

        if (now - last.current >= 1000) {
            onUpdate(frames.current);
            frames.current = 0;
            last.current = now;
        }
    };

    return {
        update,
    };
};
