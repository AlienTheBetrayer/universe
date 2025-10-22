import { useEffect, type DependencyList } from 'react';

export const useTimeout = (
    callback: () => void,
    ms: number,
    deps: DependencyList = []
) => {
    useEffect(() => {
        const timeout = setTimeout(callback, ms);
        return () => clearTimeout(timeout);
    }, [callback, ms, ...deps]);
};
