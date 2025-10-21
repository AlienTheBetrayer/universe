import { Center, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, MeshPhongMaterial } from 'three';
import { useViewport } from '../../../hooks/useViewport';

interface Props {
    text?: string;
}

export const Text3DContent = ({ text }: Props) => {
    const ref = useRef<Mesh>(null);
    const viewport = useViewport();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            // color shift
            const material = ref.current.material as MeshPhongMaterial;
            const progress = Math.abs(Math.sin(t / 4));

            material.color.r = 1 - progress;
            material.color.g = 0;
            material.color.b = progress;

            // rotation
            ref.current.rotation.x =
                Math.cos(t * 1.2) / 50 + Math.sin(t * 1.7) / 120;
            ref.current.rotation.y =
                -Math.sin(t * 1.1) / 50 + Math.cos(t * 1.5) / 120;
        }
    });
    return (
        <Center>
            <Text3D
                font='/fonts/inter-typeface-fat.json'
                size={viewport.innerWidth / 100 / 8}
                curveSegments={4}
                height={1}
                bevelEnabled
                ref={ref}
            >
                {text}
                <meshPhongMaterial shininess={160} specular='#fff' />
            </Text3D>
        </Center>
    );
};
