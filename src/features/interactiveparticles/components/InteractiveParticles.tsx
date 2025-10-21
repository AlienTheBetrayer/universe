import { useRef } from 'react';
import { Points } from 'three';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useInteractiveParticles } from '../hooks/useInteractiveParticles';
import { useInteractiveParticlesContext } from '../context/InteractiveParticlesContext';
import { useLocalStore } from '../../../zustand/localStore';

export const InteractiveParticles = () => {
    const ref = useRef<Points>(null);
    const [particlesData] = useInteractiveParticlesContext();
    const isMobile = useMediaQuery(640);
    const particles = useInteractiveParticles(
        ref,
        isMobile ? 1000 : 2000,
        particlesData.vectorType,
    );
    const { theme } = useLocalStore();

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    args={[particles.positions, 2]}
                    attach='attributes-position'
                />
                <bufferAttribute
                    args={[particles.colors, 3]}
                    attach='attributes-color'
                />
            </bufferGeometry>

            <pointsMaterial
                size={theme == 'dark' ? 0.005 : 0.02}
                vertexColors={true}
            />
        </points>
    );
};
