import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion";
import { useSpring } from "motion/react";
import { useRef } from "react";
import { Mesh, MeshPhysicalMaterial } from "three";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { Sparks } from "./Sparks";

interface Props {
    progress: MotionValue<number>;
}

export const Icosahedron = ({ progress }: Props) => {
    const ref = useRef<Mesh>(null);
    const isMobile = useMediaQuery(640);

    const spring = useSpring(progress, { 
        stiffness: 40, damping: 60, restDelta: 0.0001, restSpeed: 0.0001
    });

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            const rotation = spring.get();

            ref.current.rotation.x = rotation * 5 + t / 10;
            ref.current.rotation.y = rotation * 5 + t / 10;
            ref.current.rotation.z = rotation * 5 + t / 10;
            ref.current.scale.set(1 + rotation, 1 + rotation, 1 + rotation);

            const material = ref.current.material as MeshPhysicalMaterial;
            material.color.r = progress.get();
            material.color.b = 1 - progress.get();
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[isMobile ? 0.8 : 1, 0]}/>
            <meshPhysicalMaterial color='#0000ff'/>
            <Sparks/>
        </mesh>
    )
}