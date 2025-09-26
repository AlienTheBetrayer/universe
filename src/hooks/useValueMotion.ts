import type { MotionValue } from "motion";
import { useEffect, useState } from "react";

export const useValueMotion = (value: MotionValue<number>) => {
    const [state, setState] = useState<number>(0);
    
    useEffect(() => {
        const unsub = value.on('change', val => setState(val));
        return () => unsub();
    }, [value]);

    return state;
}