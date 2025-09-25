import { useSpring } from "motion/react";
import { useCursor, type Position } from "./useCursor";
import { useEffect, useState } from "react";

export const useSmoothCursor = (defaultPosition?: Position, damping: number = 40) => {
    const pos = useCursor(defaultPosition);

    const x = useSpring(pos.x, { stiffness: 300, damping: damping });
    const y = useSpring(pos.y, { stiffness: 300, damping: damping });

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