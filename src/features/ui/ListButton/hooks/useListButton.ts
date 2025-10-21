import { useInView } from 'motion/react';
import { useEffect, useState } from 'react';

export const useListButton = (
    containerRef: React.RefObject<HTMLElement | null>,
    elements: string[],
    onSelected?: (idx: number) => void,
) => {
    const [currentId, setCurrentId] = useState<number>(0);
    const isVisible = useInView(containerRef);

    useEffect(() => {
        onSelected?.(currentId);
    }, [currentId]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (!isVisible) return;

            switch (e.key) {
                case 'ArrowRight':
                    next();
                    break;
                case 'ArrowLeft':
                    previous();
                    break;
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [currentId, isVisible]);

    const previous = () => {
        setCurrentId(currentId == 0 ? elements.length - 1 : currentId - 1);
    };

    const next = () => {
        setCurrentId(currentId == elements.length - 1 ? 0 : currentId + 1);
    };

    return {
        currentId,
        setCurrentId,
        previous,
        next,
    };
};
