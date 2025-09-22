import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

export const useParticles = (count: number = 1000) => {
    const pointsRef = useRef<Points>(null);

    // how many "pixels" there are in our canvas
    const { width, height } = useThree().viewport;

    // calculating the positions of each and every particle
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 2);

        for(let i = 0; i < count; ++i) {
            arr[i * 2] = (Math.random() - 0.5) * width;
            arr[i * 2 + 1] = (Math.random() - 0.5) * height;
        }

        return arr;

    }, [count, width, height]);

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

        if(pointsRef.current) {
            const pos = pointsRef.current.geometry.attributes.position.array;
            const colors = pointsRef.current.geometry.attributes.color.array;

            
            for(let i = 0; i < count; ++i) {
                // colors

                // velocities
                let x = pos[i * 2];
                let y = pos[i * 2 + 1];

                if(x >= width / 2 || x <= -width / 2)
                    velocities[i * 2] *= -1;

                if(y >= height / 2 || y <= -height / 2)
                    velocities[i * 2 + 1] *= -1;

                x += velocities[i * 2];
                y += velocities[i * 2 + 1];

                pos[i * 2] = x;
                pos[i * 2 + 1] = y;
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
            pointsRef.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return { ref: pointsRef, positions: positions, colors: colors };
}