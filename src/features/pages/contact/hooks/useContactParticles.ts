import { useFrame } from "@react-three/fiber";
import React, { useMemo } from "react"
import type { Points } from "three";

export const useContactParticles = (ref: React.RefObject<Points | null>, count: number = 1000) => {
    const data = useMemo(() => {
        const positions = new Float32Array(count * 3);
        
        return {
            positions: positions
        };
    }, [count]);

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            const pos = ref.current.geometry.attributes.position.array;

            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return data;
}