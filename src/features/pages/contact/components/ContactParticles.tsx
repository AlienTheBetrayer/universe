import { useRef } from "react"
import { Points } from "three"
import { useContactParticles } from "../hooks/useContactParticles";

export const ContactParticles = () => {
    const ref = useRef<Points>(null);
    const particles = useContactParticles(ref, 1000);
    
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 3]} attach='attributes-position'/>
            </bufferGeometry>

            <pointsMaterial size={0.005}/>
        </points>
    )
}