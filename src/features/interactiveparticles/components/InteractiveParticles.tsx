import { useRef } from "react";
import { Points } from "three";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useInteractiveParticles } from "../hooks/useInteractiveParticles";
import { useInteractiveParticlesContext } from "../context/InteractiveParticlesContext";

export const InteractiveParticles = () => {
    const ref = useRef<Points>(null);
    const [particlesData, ] = useInteractiveParticlesContext();
    const isMobile = useMediaQuery(640);
    const particles = useInteractiveParticles(ref, isMobile ? 1000 : 2000, particlesData.vectorType);
    
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 2]} attach='attributes-position'/>
                <bufferAttribute args={[particles.colors, 3]} attach='attributes-color'/>
            </bufferGeometry>
            
            <pointsMaterial size={0.005} vertexColors={true}/>
        </points>
    )
}