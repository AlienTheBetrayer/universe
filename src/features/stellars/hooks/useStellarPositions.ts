import gsap from "gsap";
import { useStellarContext, type StellarViewport } from "../context/StellarContext";
import { useEffect, useRef } from "react";

export const useStellarPositions = () => {
    const [state, dispatch] = useStellarContext();
    const tweensRef = useRef<gsap.core.Tween[]>([]);

    const generate = () => {
        tweensRef.current.forEach(t => t.kill());
        tweensRef.current = [];

        const xy: { x: number, y: number }[] = [];
        console.log(state.stellars.length);
        state.stellars.forEach(() => xy.push({ x: 0, y: 0 }));

        xy.forEach((obj, idx) => {
            const tween = gsap.to(obj, {
                x: (Math.random() - 0.5) * state.viewport.width * 0.9, 
                y: (Math.random() - 0.5) * state.viewport.height * 0.7,
                duration: 4 * (1 + Math.random()), 
                ease: 'back.inOut',
                onUpdate: () => 
                    dispatch({ type: 'move', idx: idx, x: xy[idx].x, y: xy[idx].y }),
            });

            tweensRef.current.push(tween);
        });
    }

    const clear = () => {
        tweensRef.current.forEach(t => t.kill());
        tweensRef.current = [];
    }

    useEffect(() => {
        if(state.stellars.length == 0)
            clear();
    }, [state.stellars]);

    useEffect(() => {
        return () => {
            clear();
        }
    }, []);

    return { 
        generate, clear
    };
}