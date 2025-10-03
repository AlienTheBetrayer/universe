import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion"
import { useRef } from "react";
import { Mesh } from "three";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useTransform } from "motion/react";

interface Props {
    progress: MotionValue<number>;
}

export const MovingRectangle = ({ progress }: Props) => {
    const meshRef = useRef<Mesh>(null);
    const isMobile = useMediaQuery(768);
    const three = useThree();
    const progressViewport = useTransform(progress, 
        [0, 1], 
        isMobile ? [-three.viewport.width / 2, three.viewport.width / 2] : [three.viewport.height / 2, -three.viewport.height / 2]);
    
    useFrame(state => {
        if(meshRef.current) {
            const t = state.clock.getElapsedTime();
            
            const scale: number = 0.9 + Math.sin(t) / 30;
            if(isMobile) {
                meshRef.current.position.x = progressViewport.get();
                meshRef.current.rotation.y = progress.get() * 8
            } else {
                meshRef.current.rotation.x = progress.get() * 8;
                meshRef.current.position.y = progressViewport.get();
            }

            meshRef.current.scale.set(scale, scale, scale);
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <boxGeometry args={isMobile ? [2, 4, 2] : [4, 2, 2]}/>
            <meshPhysicalMaterial color='#fff' roughness={0.5} metalness={0.8} clearcoat={1} clearcoatRoughness={0}/>
        </mesh>
    )
}