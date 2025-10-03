import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion"
import { useRef } from "react";
import { Mesh } from "three";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

interface Props {
    progress: MotionValue<number>;
}

export const MovingRectangle = ({ progress }: Props) => {
    const meshRef = useRef<Mesh>(null);
    const isMobile = useMediaQuery(768);
    
    useFrame(state => {
        if(meshRef.current) {
            const t = state.clock.getElapsedTime();

            if(isMobile) {
                meshRef.current.rotation.y = progress.get() * 8;
            } else {
                meshRef.current.rotation.x = progress.get() * 4;
            }

            const scale = 1 + Math.sin(t) / 30;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <boxGeometry args={ isMobile ? [2, 6, 1] : [10, 4, 3]}/>
            <meshPhysicalMaterial
            color='#fff'
            roughness={0.5}   // lower = shinier
            metalness={0.8}     // higher = more reflective
            clearcoat={1}     // adds car-paint style layer
            clearcoatRoughness={0}
            />
        </mesh>
    )
}