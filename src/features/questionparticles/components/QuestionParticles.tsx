import { useRef } from "react";
import { Points } from "three";
import { useQuestionParticles } from "../hooks/useQuestionParticles";

export const QuestionParticles = () => {
    const pointsRef = useRef<Points>(null);
    const particles = useQuestionParticles(pointsRef, 1000);
    
    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 2]} attach='attributes-position'/>
            </bufferGeometry>
            
            <pointsMaterial size={0.01}/>
        </points>
    )
}

