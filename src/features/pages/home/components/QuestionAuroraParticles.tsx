import { useRef } from "react"
import { Points } from "three"
import { useAuroraParticles } from "../hooks/useAuroraParticles";

export const QuestionAuroraParticles = () => {
    const pointsRef = useRef<Points>(null);
    const particles = useAuroraParticles(pointsRef);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 2]} attach='attributes-position'/>
            </bufferGeometry>
            
            <pointsMaterial size={0.01}/>
        </points>
    )
}