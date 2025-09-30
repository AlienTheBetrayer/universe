import { useEffect } from "react";
import type { StellarContextData } from "../context/StellarContext";
import gsap from "gsap";
import type { Viewport } from "@react-three/fiber";

export const useStellarPositions = (data: StellarContextData, setData: React.Dispatch<React.SetStateAction<StellarContextData>>, viewport: Viewport) => {
    useEffect(() => {
        const xy: { x?: number, y?: number }[] = [];
        data.stellars.forEach(() => xy.push({ x: 0, y: 0 }));

        xy.forEach(obj => {
            gsap.to(obj, { x: (Math.random() - 0.5) * viewport.width * 0.9, y: (Math.random() - 0.5) * viewport.height * 0.7, 
                duration: 4 * (1 + Math.random() / 2), ease: 'expo.inOut', 
                onUpdate: () => setData(prev => ({ ...prev, stellars: 
                    prev.stellars.map((stellar, idx) => ({ ...stellar, x: xy[idx].x, y: xy[idx].y }))
                })) });
        }); 
    }, []);
}