import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import type { Points } from "three";
import { useSmoothCursor } from "../../../../hooks/useSmoothCursor";
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
                
                let vectorX = 0;
                let vectorY = 0;
                let color: number[] = [0, 0, 30];

                switch(vectorType) {
                    case VectorTypes.propulsion:
                        vectorX = dx / distance;
                        vectorY = dy / distance;
                        color = [0, 0, 30];
                    break;
                    case VectorTypes.repulsion:
                        vectorX = -dx / distance;
                        vectorY = -dy / distance;
                        color = [30, 0, 0];
                    break;
                    case VectorTypes.waves:
                        vectorX = Math.sin(t);
                        vectorY = Math.sin(t);
                        color = [12, 50, 59];
                    break;
                    case VectorTypes.nebula:
                        vectorX = -dy * 2;
                        vectorY = dx * 2;
                        color = [48, 13, 78];
                    break;
                    case VectorTypes.living:
                        vectorX = Math.sin(dx*7 - dy*3 + t*4) * Math.cos(dy*5 + Math.sqrt(dx*dx+dy*dy)*3 + Math.sin(t*2)) + Math.tan(Math.sin(dx*0.5 + t*3)) * 0.02;
                        vectorY = Math.cos(dy*6 + dx*2 + t*3.5) * Math.sin(dx*4 + Math.sqrt(dx*dx+dy*dy)*5 + Math.cos(t*1.7)) + Math.tan(Math.cos(dy*0.7 + t*2.1)) * 0.02;
                        color= [0, 20, 10];
                    break;
                    case VectorTypes.checker:
                        vectorX = Math.sin(t % 20 * dx);
                        vectorY = Math.sin(t % 20 * dy);
                        color = [10, 10, 10];
                    break;
                    case VectorTypes.astral:
                        vectorX = (dx/distance) * Math.sin(t + distance*5) * Math.exp(-distance*0.5) - (dy/distance) * Math.cos(t*2 + Math.log(distance+1)*3);
                        vectorY = (dy/distance) * Math.sin(t + distance*5) * Math.exp(-distance*0.5) + (dx/distance) * Math.cos(t*2 + Math.log(distance+1)*3);
                        color = [10, 10, 30];
                    break;
                }
                

                // cursor effect
                if (distance < radius) {
                    pos[i * 2] += vectorX * force;
                    pos[i * 2 + 1] += vectorY * force;

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