import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion";
import { useSpring } from "motion/react";
import { useRef } from "react";
import { Mesh } from "three";

interface Props {
    progress: MotionValue<number>;
}

export const Icosahedron = ({ progress }: Props) => {
    const ref = useRef<Mesh>(null);

    const spring = useSpring(progress, { 
        stiffness: 40, damping: 60, restDelta: 0.0001, restSpeed: 0.0001
    });

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            const rotation = spring.get();

            ref.current.rotation.x = rotation * 50;
            ref.current.rotation.y = rotation * 50;
            ref.current.rotation.z = rotation * 50;
            ref.current.scale.set(1 + rotation, 1 + rotation, 1 + rotation);
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[1, 0]}/>
            <meshPhysicalMaterial color='#0000ff'/>

        </mesh>
    )
}