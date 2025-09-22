import { useRef } from "react";
import { useParticles } from "../hooks/useParticles";
import { Points } from "three";

export const Particles = () => {
    const ref = useRef<Points>(null);
    const particles = useParticles(ref, 2000);

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