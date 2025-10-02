import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react"
import type { Points } from "three";

export const useStarParticles = (ref: React.RefObject<Points | null>, count: number = 1000) => {
    const { viewport, pointer } = useThree();
    
    const data = useMemo(() => {
        const positions = new Float32Array(count * 2);
        const velocities = new Float32Array(count * 2);

        for(let i = 0; i < count; ++i) {
            positions[i * 2] = (Math.random() - 0.5) * viewport.width;
            positions[i * 2 + 1] = (Math.random() - 0.5) * viewport.height;

            velocities[i * 2] = 0;
            velocities[i * 2 + 1] = 0;
         }

        return { positions, velocities }
    }, [count]);

    useFrame(() => {
        if(ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            const cursorX = pointer.x * viewport.width / 2;
            const cursorY = pointer.y * viewport.height / 2;
            
            for(let i = 0; i < count; ++i) {
                const chance = Math.random() > 0.9995;
                if(chance) {
                    data.velocities[i * 2] = (Math.random() - 0.5) / 30;
                    data.velocities[i * 2 + 1] = (Math.random() - 0.5) / 30;

                    const fastChance = Math.random() > 0.99;
                    
                    if(fastChance) {
                        data.velocities[i * 2] *= 5;
                        data.velocities[i * 2 + 1] *= 5;
                    }
                }

                if(pos[i * 2] > viewport.width / 2 || pos[i * 2] < -viewport.width / 2) {
                    data.velocities[i * 2] *= -1;
                }

                if(pos[i * 2 + 1] > viewport.height / 2 || pos[i * 2 + 1] < -viewport.height / 2) {
                    data.velocities[i * 2 + 1] *= -1;
                }

                if(data.velocities[i * 2] != 0) {
                    pos[i * 2] += data.velocities[i * 2];
                    data.velocities[i * 2] *= 0.99;
                }

                if(data.velocities[i * 2 + 1] != 0) {
                    pos[i * 2 + 1] += data.velocities[i * 2 + 1];
                    data.velocities[i * 2 + 1] *= 0.99;
                }
            }

            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return data;
}