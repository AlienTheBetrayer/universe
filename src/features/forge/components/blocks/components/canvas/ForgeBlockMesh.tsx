import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import {
    BlockDataMaterials,
    type BlockDataMaterial,
} from '../../../../context/types/world/block';

interface Props {
    idx: number;
    hoveredIdx: React.RefObject<number | false>;
    material: BlockDataMaterial;
}

export const ForgeBlockMesh = ({ idx, material, hoveredIdx }: Props) => {
    const meshRef = useRef<Mesh>(null);

    // initial random rotation
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.rotation.set(
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            );
        }
    }, []);

    // rotation animation
    useFrame(() => {
        if (meshRef.current) {
            if (hoveredIdx.current === false) {
                // none is selected (regular moving)
                meshRef.current.rotation.x += 0.0075;
                meshRef.current.rotation.y += 0.0075;
                meshRef.current.rotation.z += 0.0075;
            } else if (hoveredIdx.current === idx) {
                // current one is selected (fast moving)
                meshRef.current.rotation.x += 0.02;
                meshRef.current.rotation.y += 0.02;
                meshRef.current.rotation.z += 0.02;
            } else {
                // something is selected but not this (slow moving)
                meshRef.current.rotation.x += 0.002;
                meshRef.current.rotation.y += 0.002;
                meshRef.current.rotation.z += 0.002;
            }
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[3, 3, 3]} />
            {BlockDataMaterials[material].jsx}
        </mesh>
    );
};
