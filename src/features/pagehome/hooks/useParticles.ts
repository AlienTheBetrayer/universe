import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

export const useParticles = (count: number = 1000) => {
    const pointsRef = useRef<Points>(null);

    // how many "pixels" there are in our canvas
    const { width, height } = useThree().viewport;

    // calculating the positions of each and every particle
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);

        for(let i = 0; i < count; ++i) {
            arr[i * 3] = (Math.random() - 0.5) * width;
            arr[i * 3 + 1] = (Math.random() - 0.5) * height;
            arr[i * 3 + 2] = (Math.random() - 0.5);
        }

        return arr;
    }, [count, width, height]);

    // calculating the velocities of each and every particle
    const velocities = useMemo(() => {
        const arr = new Float32Array(count * 2);

        for(let i = 0; i < count; ++i) {
            arr[i * 3] = (Math.random() - 0.5) * 0.01;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
        }

        return arr;
    }, [count]);
    
    const colors = useMemo(() => {
        const arr = new Float32Array(count * 3);

        return arr;
    }, [count]);

    // applying that velocity to our position
    useFrame(() => {
        if(pointsRef.current) {
            const pos = pointsRef.current.geometry.attributes.position.array;

            for(let i = 0; i < count; ++i) {
                let x = pos[i * 3];
                let y = pos[i * 3 + 1];

                if(x >= width / 2 || x <= -width / 2)
                    velocities[i * 3] *= -1;

                if(y >= height / 2 || y <= -height / 2)
                    velocities[i * 3 + 1] *= -1;

                x += velocities[i * 3];
                y += velocities[i * 3 + 1];
            

                pos[i * 3] = x;
                pos[i * 3 + 1] = y;
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return { ref: pointsRef, positions: positions, colors: colors };
}