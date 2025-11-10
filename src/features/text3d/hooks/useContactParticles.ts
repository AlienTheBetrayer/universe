import { useFrame } from '@react-three/fiber';
import React, { useMemo } from 'react';
import type { Points } from 'three';

export const useContactParticles = (
    ref: React.RefObject<Points | null>,
    count: number = 1000,
) => {
    const data = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; ++i) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }

        return {
            positions: positions,
            colors: colors,
        };
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            const colors = ref.current.geometry.attributes.color.array;

            for (let i = 0; i < count; ++i) {
                pos[i * 3] = Math.cos(t / 2);
                pos[i * 3 + 1] = -Math.sin(t / 2);
                pos[i * 3 + 2] = Math.sin(t / 2 + ((i / count) * t) / 2) * 15;

                const progress = Math.abs(Math.sin(t / 4));
                colors[i * 3] = 0;
                colors[i * 3 + 1] = 0;
                colors[i * 3 + 2] = progress / 3;
            }

            ref.current.geometry.attributes.position.needsUpdate = true;
            ref.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return data;
};
