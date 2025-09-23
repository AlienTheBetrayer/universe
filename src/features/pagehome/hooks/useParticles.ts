import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import type { Points } from "three";
import { useSmoothCursor } from "../../../hooks/useSmoothCursor";
import { VectorTypes } from "../context/ParticlesContext";

export const useParticles = (ref: React.RefObject<Points | null>, count: number = 1000, vectorType?: string) => {
    // how many "pixels" there are in our canvas
    const { size, viewport } = useThree();
    const pointer = useSmoothCursor({ x: 330, y: 120 });

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
    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            const colors = ref.current.geometry.attributes.color.array;
            const cursorX = (pointer.x / size.width * viewport.width) - viewport.width / 2;
            const cursorY = -((pointer.y + window.scrollY) / size.height * viewport.height) + viewport.height / 2;
            
            const radius = viewport.width < 3 ? 0.4 : 1.25;

            for(let i = 0; i < count; ++i) {
                const dx = (pos[i * 2] - cursorX);
                const dy = (pos[i * 2 + 1] - cursorY);
                
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = (radius - distance) * 0.05;
                
                
                let ux = 0;
                let uy = 0;
                let color: number[] = [0, 0, 30];

                switch(vectorType) {
                    case VectorTypes.propulsion:
                        ux = dx / distance;
                        uy = dy / distance;
                        color = [0, 0, 30];
                    break;
                    case VectorTypes.repulsion:
                        ux = -dx / distance;
                        uy = -dy / distance;
                        color = [30, 0, 0];
                    break;
                    case VectorTypes.waves:
                        ux = Math.sin(t);
                        uy = Math.sin(t);
                        color = [12, 50, 59];
                    break;
                    case VectorTypes.nebula:
                        ux = dy;
                        uy = dx;
                        color = [48, 13, 78];
                    break;
                    case VectorTypes.swarm:
                        ux = distance - dx;
                        uy = distance - dy;
                    break;
                    case VectorTypes.checker:
                        ux = Math.sin(t % 20 * dx);
                        uy = Math.sin(t % 20 * dy);
                        color = [5, 5, 5];
                    break;
                }
                

                // cursor effect
                if (distance < radius) {
                    pos[i * 2] += ux * force;
                    pos[i * 2 + 1] += uy * force;

                    colors[i * 3] = color[0]; 
                    colors[i * 3 + 1] = color[1]; 
                    colors[i * 3 + 2] = color[2]; 
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