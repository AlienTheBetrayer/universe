import { MotionValue, useScroll } from "motion/react"
import { useEffect, useState } from "react";

export const useScrollYWithin = (from: number, to: number, scroll?: MotionValue<number>) => {
    const progress = scroll ?? useScroll().scrollYProgress;
    const [passed, setPassed] = useState<boolean>(false);

    useEffect(() => {
        const unsub = progress.on('change', val => setPassed(val > from && val < to));
        return () => unsub();
    }, [progress]);

    return passed;
}