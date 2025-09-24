import { useSpring, type SpringOptions } from "motion/react";
import { useCursor, type Position } from "./useCursor";
import { useEffect, useState } from "react";

const springSettings: SpringOptions = {
    stiffness: 300,
    damping: 40,
} 

export const useSmoothCursor = (defaultPosition?: Position) => {
    const pos = useCursor(defaultPosition);

    const x = useSpring(pos.x, springSettings);
    const y = useSpring(pos.y, springSettings);

    const [smoothPos, setSmoothPos] = useState<Position>(defaultPosition ?? { x: 0, y : 0 });

    useEffect(() => {
        x.set(pos.x);
        y.set(pos.y);
    }, [pos.x, pos.y]);

    useEffect(() => {
        const unsubX = x.on('change', value => setSmoothPos(prev => ({...prev, x: value})));
        const unsubY = y.on('change', value => setSmoothPos(prev => ({...prev, y: value})));

        return () => { unsubX(); unsubY() }
    }, []);

    return smoothPos;
}