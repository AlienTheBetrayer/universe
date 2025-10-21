import { useEffect, useState } from 'react';

const match = (breakpoint: number) => {
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
};

export const useMediaQuery = (maxWidth: number) => {
    const [matched, setMatched] = useState<boolean>(() => match(maxWidth));

    useEffect(() => {
        const handle = () => setMatched(match(maxWidth));

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [maxWidth]);

    return matched;
};
