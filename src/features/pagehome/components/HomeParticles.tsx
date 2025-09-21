import { useParticles } from "../hooks/useParticles";

export const HomeParticles = () => {
    const particles = useParticles(1250);

    return (
        <points ref={particles.ref}>
            <bufferGeometry>
                <bufferAttribute args={[particles.positions, 3]} attach='attributes-position'/>
                <bufferAttribute args={[particles.colors, 3]} attach='attributes-color'/>
            </bufferGeometry>
            <pointsMaterial color='#919191' size={0.005}/>
        </points>
    )
}