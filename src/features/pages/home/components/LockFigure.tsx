import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion";
import { useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mesh, MeshPhysicalMaterial } from "three";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { LockParticles } from "./LockParticles";
import { Group } from "three";


interface Props {
    progress: MotionValue<number>;
}

export const LockFigure = ({ progress }: Props) => {
    const groupRef = useRef<Group>(null);
    const mainRef = useRef<Mesh>(null);
    const orbitRef = useRef<Mesh>(null);

    const isMobile = useMediaQuery(640);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const spring = useSpring(progress, { 
        stiffness: 40, damping: 60, restDelta: 0.0001, restSpeed: 0.0001
    });

    useEffect(() => {
        const unsubscribe = progress.on('change', val => val > 0 && setScrolled(true));
        return () => unsubscribe();
    }, [progress]);

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(groupRef.current && mainRef.current && orbitRef.current) {
            const rotation = spring.get();
            const progressValue = progress.get();
            const mainMaterial = mainRef.current.material as MeshPhysicalMaterial;
            const orbitMaterial = orbitRef.current.material as MeshPhysicalMaterial;

            // rotation
            groupRef.current.rotation.x = rotation * 5 + t / 30;
            groupRef.current.rotation.y = rotation * 5 + t / 30;
            groupRef.current.rotation.z = rotation * 5 + t / 30;
            groupRef.current.scale.set(1 + rotation, 1 + rotation, 1 + rotation);

            // main sphere color based on progress
            mainMaterial.color.r = progressValue * 2;
            mainMaterial.color.b = (1 - progressValue) * 2;

            // orbit rotation + orbit sphere color based on progress
            orbitRef.current.position.set(Math.sin(t) * 1.25, Math.cos(t) * 1.25, Math.sin(t) * 1.25);
            orbitMaterial.color.r = progressValue * 8;
            orbitMaterial.color.b = (1 - progressValue) * 8;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={mainRef}>
                <icosahedronGeometry args={[isMobile ? 0.7 : 1, 0]}/>
                <meshPhysicalMaterial color='#0000ff'/>

                { scrolled && <LockParticles/> }
            </mesh>
            <mesh ref={orbitRef}>
                <icosahedronGeometry args={[isMobile ? 0.15 : 0.2, 0]}/>
                <meshPhysicalMaterial color='#ff0000'/>
            </mesh>
        </group>
    )
}