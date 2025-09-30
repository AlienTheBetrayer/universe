import { useEffect } from "react";
import { useStellarContext } from "../context/StellarContext";
import gsap from "gsap";
import type { Viewport } from "@react-three/fiber";

export const useStellarPositions = (viewport: Viewport) => {
    const [state, dispatch] = useStellarContext();
    
    useEffect(() => {
        const xy: { x: number, y: number }[] = [];
        state.stellars.forEach(() => xy.push({ x: 0, y: 0 }));

        xy.forEach((obj, idx) => {
            gsap.to(obj, { x: (Math.random() - 0.5) * viewport.width * 0.9, y: (Math.random() - 0.5) * viewport.height * 0.7, 
                duration: 4 * (1 + Math.random()), ease: 'back.inOut', 
                onUpdate: () => dispatch({ type: 'move', idx: idx, x: xy[idx].x, y: xy[idx].y })
            });
        }); 
    }, []);
}