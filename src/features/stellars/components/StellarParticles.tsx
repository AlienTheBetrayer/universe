import { useRef } from "react";
import { useStarParticles } from "../hooks/useStarParticles";
import { Points } from "three";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useLocalStore } from "../../../zustand/localStore";

export const StellarParticles = () => {
    const ref = useRef<Points>(null);
    const isMobile = useMediaQuery(640);
    const particles = useStarParticles(ref, isMobile ? 200 : 500);
    const { theme } = useLocalStore();

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach='attributes-position' args={[particles.positions, 2]}/>
            </bufferGeometry>

            <pointsMaterial size={theme === 'dark' ? 0.01 : 0.03} color={theme === 'dark' ? '#555' : '#000'}/>
        </points>
    )
}