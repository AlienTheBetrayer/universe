import { useRef } from "react";
import { useHeadingParticles } from "../hooks/useHeadingParticles";
import { Points } from "three";
import { useParticlesContext } from "../context/ParticlesContext";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

export const HeadingParticles = () => {
    const ref = useRef<Points>(null);
    const [particlesData, ] = useParticlesContext();
    const isMobile = useMediaQuery(640);
    const particles = useHeadingParticles(ref, isMobile ? 1000 : 2000, particlesData.vectorType);
    
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