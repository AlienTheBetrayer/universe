import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import type { Points } from 'three';

export const useAuroraParticles = (
    ref: React.RefObject<Points | null>,
    count: number = 1000,
) => {
    const { viewport } = useThree();

    const data = useMemo(() => {
        const positions = new Float32Array(count * 2);

        return {
            positions: positions,
        };
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (ref.current) {
            for (let i = 0; i < count; ++i) {
                const pos = ref.current.geometry.attributes.position.array;

                pos[i * 2] = -viewport.width / 2 + (i / count) * viewport.width;
                pos[i * 2 + 1] = Math.sin(t + i / 100) * (i / count) * 30;
            }

            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return data;
};
