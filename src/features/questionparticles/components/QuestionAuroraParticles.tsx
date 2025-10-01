import { useRef } from "react"
import { Points } from "three"
import { useAuroraParticles } from "../hooks/useAuroraParticles";
import { useLocalStore } from "../../../zustand/localStore";

export const QuestionAuroraParticles = () => {
    const pointsRef = useRef<Points>(null);
    const particles = useAuroraParticles(pointsRef);
    const { theme } = useLocalStore();

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 2]} attach='attributes-position'/>
            </bufferGeometry>
            
            <pointsMaterial size={theme === 'dark' ? 0.01 : 0.1} color={theme === 'dark' ? '#fff' : '#000'}/>
        </points>
    )
}