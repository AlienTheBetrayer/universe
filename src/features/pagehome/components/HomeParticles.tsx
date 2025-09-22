import { useParticles } from "../hooks/useParticles";

export const HomeParticles = () => {
    const particles = useParticles(1000);

    return (
        <points ref={particles.ref}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 2]} attach='attributes-position'/>
                <bufferAttribute args={[particles.colors, 3]} attach='attributes-color'/>
            </bufferGeometry>
            <pointsMaterial size={0.005} vertexColors={true}/>
        </points>
    )
}