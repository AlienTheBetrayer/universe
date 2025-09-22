import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import type { Points } from "three";
import { useCursor } from "../../../hooks/useCursor";

export const useParticles = (ref: React.RefObject<Points | null>, count: number = 1000) => {
    // how many "pixels" there are in our canvas
    const { size, viewport } = useThree();
    const pointer = useCursor({ x: 200, y: 500 });

    // calculating the positions of each and every particle
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 2);

        for(let i = 0; i < count; ++i) {
            arr[i * 2] = (Math.random() - 0.5) * viewport.width;
            arr[i * 2 + 1] = (Math.random() - 0.5) * viewport.height;
        }

        return arr;

    }, [count, viewport.width, viewport.height]);


    // calculating the color of each and every particle
    const colors = useMemo(() => {
        const arr = new Float32Array(count * 3);

        for(let i = 0; i < count; ++i) {
            arr[i * 3] = 0.3;
            arr[i * 3 + 1] = 0.3;
            arr[i * 3 + 2] = 0.3;
        }

        return arr;
    }, [count]);


    // calculating the velocities of each and every particle
    const velocities = useMemo(() => {
        const arr = new Float32Array(count * 2);

        for(let i = 0; i < count; ++i) {
            const fast = Math.random() > 0.99;

            arr[i * 2] = (Math.random() - 0.5) * (fast ? 0.1 : 0.01);
            arr[i * 2 + 1] = (Math.random() - 0.5) * (fast ? 0.1 : 0.01);
        }

        return arr;
    }, [count]);


    // animating position
    useFrame(_state => {
        if(ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            const colors = ref.current.geometry.attributes.color.array;
            const cursorX = (pointer.current.x / size.width * viewport.width) - viewport.width / 2;
            const cursorY = -((pointer.current.y + window.scrollY) / size.height * viewport.height) + viewport.height / 2;
            
            for(let i = 0; i < count; ++i) {
                // put - to repulse 
                const dx = (pos[i * 2] - cursorX);
                const dy = (pos[i * 2 + 1] - cursorY);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = (1 - distance) * 0.1;

                // cursor effect
                if (distance < 1) {
                    pos[i * 2] += (dx / distance) * force;
                    pos[i * 2 + 1] += (dy / distance) * force;

                    colors[i * 3] = 0; 
                    colors[i * 3 + 1] = 0; 
                    colors[i * 3 + 2] = 30; 
                } else {
                    colors[i * 3] = 0.3; 
                    colors[i * 3 + 1] = 0.3; 
                    colors[i * 3 + 2] = 0.3; 
                }
                
                // bouncing off of the screen's edges
                if(pos[i * 2] >= viewport.width / 2 || pos[i * 2] <= -viewport.width / 2)
                    velocities[i * 2] *= -1;

                if(pos[i * 2 + 1] >= viewport.height / 2 || pos[i * 2 + 1] <= -viewport.height / 2)
                    velocities[i * 2 + 1] *= -1;

                // idle moving w/ velocity
                pos[i * 2] += velocities[i * 2];
                pos[i * 2 + 1] += velocities[i * 2 + 1];
            }

            ref.current.geometry.attributes.position.needsUpdate = true;
            ref.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return { positions: positions, colors: colors };
}