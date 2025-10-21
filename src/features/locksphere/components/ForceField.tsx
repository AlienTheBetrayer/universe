import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'motion';
import { useRef } from 'react';
import { Color, Mesh, MeshPhysicalMaterial, type HSL } from 'three';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface Props {
    progress: MotionValue<number>;
}

export const ForceField = ({ progress }: Props) => {
    const ref = useRef<Mesh>(null);
    const isMobile = useMediaQuery(640);

    useFrame(() => {
        if (ref.current) {
            const progressValue = progress.get();
            const material = ref.current.material as MeshPhysicalMaterial;
            const scale = 1 + progressValue / 10;

            ref.current.rotation.x += 0.001 + progressValue / 100;
            ref.current.rotation.y += 0.001 + progressValue / 100;
            ref.current.rotation.z += 0.001 + progressValue / 100;

            const color = new Color(progressValue, 0, 1 - progressValue);
            const hsl: HSL = { h: 0, s: 0, l: 0 };
            color.getHSL(hsl);
            hsl.s *= 0.7;
            color.setHSL(hsl.h, hsl.s, hsl.l);

            material.color.copy(color);

            ref.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[isMobile ? 1.3 : 2.7, 2]} />
            <meshPhysicalMaterial color='#6868d2' wireframe />
        </mesh>
    );
};
