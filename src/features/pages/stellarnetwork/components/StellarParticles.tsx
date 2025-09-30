import { useRef } from "react";
import { useStarParticles } from "../hooks/useStarParticles"
import { Points } from "three";

export const StellarParticles = () => {
    const ref = useRef<Points>(null);
    const particles = useStarParticles(ref);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach='attributes-position' args={[particles.positions, 2]}/>
            </bufferGeometry>

            <pointsMaterial size={0.01} color='#444'/>;
        </points>
    )
}