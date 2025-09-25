import { useFrame, useThree } from "@react-three/fiber"
import { useMemo } from "react";
import type { Points } from "three";
import { useSmoothCursor } from "../../../../hooks/useSmoothCursor";

export const useQuestionParticles = (ref: React.RefObject<Points | null>, count: number = 1000) => {
    const { size, viewport, gl } = useThree();
    const pointer = useSmoothCursor();
    const rect = gl.domElement.getBoundingClientRect();
    
    
    const data = useMemo(() => {
        const positions = new Float32Array(count * 2);
        const directions = new Float32Array(count * 2);

        return {
            positions: positions,
            directions: directions
        }
    }, [count]);

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            const cursorX = (pointer.x / rect.width) * viewport.width - viewport.width / 2;
            const cursorY = -((pointer.y - rect.top) / rect.height ) * viewport.height + viewport.height / 2;

            pos[0] = cursorX + data.directions[0];
            pos[1] = cursorY + data.directions[1]

            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return { positions: data.positions };        
}