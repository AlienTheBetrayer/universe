import { useRef } from "react";
import { useLockParticles } from "../hooks/useLockParticles";
import { Points } from "three";
import { useLocalStore } from "../../../../zustand/localStore";

export const LockParticles = () => {
    const ref = useRef<Points>(null);
    const sparks = useLockParticles(ref, 1000);

    const { theme } = useLocalStore();
    const dotColor = theme === 'dark' ? '#fff' : '#000';

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute args={[sparks.positions, 3]} attach='attributes-position'/>
            </bufferGeometry>
            <pointsMaterial size={0.01} color={dotColor}/>
        </points>
    )
}