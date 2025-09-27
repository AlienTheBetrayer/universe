import { useRef } from "react"
import { Points } from "three"
import { useContactParticles } from "../hooks/useContactParticles";

export const ContactParticles = () => {
    const ref = useRef<Points>(null);
    const particles = useContactParticles(ref, 250);
    
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 3]} attach='attributes-position'/>
                <bufferAttribute args={[particles.colors, 3]} attach='attributes-color'/>
            </bufferGeometry>

            <pointsMaterial size={0.01} vertexColors/>
        </points>
    )
}