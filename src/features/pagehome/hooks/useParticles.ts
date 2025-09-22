import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import type { Points } from "three";
import { useCursor } from "../../../hooks/useCursor";

export const useParticles = (ref: React.RefObject<Points | null>, count: number = 1000) => {
    // how many "pixels" there are in our canvas
    const { size, viewport } = useThree();
    const pointer = useCursor();

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
            const cursorX = (pointer.current.x / size.width * viewport.width) - viewport.width / 2;
            const cursorY = -((pointer.current.y + window.scrollY) / size.height * viewport.height) + viewport.height / 2;
            
            for(let i = 0; i < count; ++i) {
                // colors

                // positions
                let x = pos[i * 2]; // 5.98
                let y = pos[i * 2 + 1];

                const dx = (x - cursorX);
                const dy = (y - cursorY);


                if (Math.sqrt(dx * dx + dy * dy) < 1) {
                    x *= 1.01;
                    y *= 1.01;
                    colors[i * 3] = 1; 
                    colors[i * 3 + 1] = 0; 
                    colors[i * 3 + 2] = 0; 
                } else {
                    colors[i * 3] = 0.3; 
                    colors[i * 3 + 1] = 0.3; 
                    colors[i * 3 + 2] = 0.3; 
                }
                
                
                // velocities
                if(x >= viewport.width / 2 || x <= -viewport.width / 2)
                    velocities[i * 2] *= -1;

                if(y >= viewport.height / 2 || y <= -viewport.height / 2)
                    velocities[i * 2 + 1] *= -1;

                x += velocities[i * 2];
                y += velocities[i * 2 + 1];

                pos[i * 2] = x;
                pos[i * 2 + 1] = y;
            }

            ref.current.geometry.attributes.position.needsUpdate = true;
            ref.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return { positions: positions, colors: colors };
}