import { useRef } from "react";
import { useStars } from "../hooks/useStars"
import { Points } from "three";

export const StellarParticles = () => {
    const ref = useRef<Points>(null);
    const particles = useStars(ref);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach='attributes-position' args={[particles.positions, 2]}/>
            </bufferGeometry>

            <pointsMaterial size={0.01} color='#333'/>;
        </points>
    )
}