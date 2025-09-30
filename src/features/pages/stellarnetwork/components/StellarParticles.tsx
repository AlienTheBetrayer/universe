import { useRef } from "react";
import { useStarParticles } from "../hooks/useStarParticles"
import { Points } from "three";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

export const StellarParticles = () => {
    const ref = useRef<Points>(null);
    const isMobile = useMediaQuery(640);
    const particles = useStarParticles(ref, isMobile ? 200 : 500);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach='attributes-position' args={[particles.positions, 2]}/>
            </bufferGeometry>

            <pointsMaterial size={0.01} color='#444'/>;
        </points>
    )
}