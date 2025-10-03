import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion"
import { useRef } from "react";
import { Mesh } from "three";

interface Props {
    progress: MotionValue<number>;
}

export const MovingRectangle = ({ progress }: Props) => {
    const meshRef = useRef<Mesh>(null);
    
    useFrame(() => {
        if(meshRef.current) {
            meshRef.current.rotation.x = progress.get() * 4;
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[6, 3, 3]}/>
            <meshPhysicalMaterial wireframe/>
        </mesh>
    )
}