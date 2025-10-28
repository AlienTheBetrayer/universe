import { useEffect, useRef } from "react";
import { Mesh } from "three";
import type { BlockDataMaterial } from "../../../../context/types/world/block";
import { useFrame } from "@react-three/fiber";

interface Props {
    block: BlockDataMaterial;
}

export const ForgeBlockMesh = ({ block }: Props) => {
    const meshRef = useRef<Mesh>(null);

    // initial random rotation
    useEffect(() => {
        if(meshRef.current) {
            meshRef.current.rotation.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
        }
    }, []);

    // rotation animation
    useFrame(() => {
        if(meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.z += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[3, 3, 3]}/>
            { block.jsx }
        </mesh>
    )
}