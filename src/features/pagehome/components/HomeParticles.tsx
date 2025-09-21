import { useParticles } from "../hooks/useParticles";

export const HomeParticles = () => {
    const particles = useParticles(1000);

    return (
        <points ref={particles.ref}>
            <bufferGeometry>
                <bufferAttribute args={[particles.array, 3]} attach='attributes-position'/>
            </bufferGeometry>
            <pointsMaterial color='#919191' size={0.005}/>
        </points>
    )
}