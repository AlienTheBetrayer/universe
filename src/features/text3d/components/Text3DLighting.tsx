import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { PointLight } from 'three';

export const Text3DLighting = () => {
    const ref = useRef<PointLight>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (ref.current) {
            ref.current.position.x =
                -2 + Math.sin(t * 0.8) * 2 + Math.sin(t * 1.3) * 0.5;
            ref.current.position.y =
                0 + Math.cos(t * 0.7) * 0.8 + Math.sin(t * 1.5) * 0.3;
            ref.current.position.z =
                -2 + Math.sin(t * 0.9) * 1.5 + Math.cos(t * 1.1) * 0.5;
        }
    });

    return <pointLight ref={ref} position={[-2, 1, 1]} intensity={2} />;
};
