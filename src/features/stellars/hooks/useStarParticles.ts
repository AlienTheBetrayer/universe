import { useThree } from "@react-three/fiber";
import { useMemo, } from "react"
import type { Points } from "three";

export const useStarParticles = (_ref: React.RefObject<Points | null>, count: number = 1000) => {
    const { viewport } = useThree();
    
    const data = useMemo(() => {
        const positions = new Float32Array(count * 2);

        for(let i = 0; i < count; ++i) {
            positions[i * 2] = (Math.random() - 0.5) * viewport.width;
            positions[i * 2 + 1] = (Math.random() - 0.5) * viewport.height;
         }

        return { positions }
    }, [count]);

    return data;
}