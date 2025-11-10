import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Points } from 'three';
import { useFPS } from '../../../hooks/useFPS';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useLocalStore } from '../../../zustand/localStore';
import { useInteractiveParticlesContext } from '../context/InteractiveParticlesContext';
import { useInteractiveParticles } from '../hooks/useInteractiveParticles';

interface Props {
    onFPSUpdate: (fps: number) => void;
}

export const InteractiveParticles = ({ onFPSUpdate }: Props) => {
    const ref = useRef<Points>(null);
    const [particlesData] = useInteractiveParticlesContext();
    const isMobile = useMediaQuery(640);
    const particles = useInteractiveParticles(
        ref,
        isMobile ? 1000 : 2000,
        particlesData.vectorType
    );
    const { theme } = useLocalStore();

    const fps = useFPS(onFPSUpdate);

    useFrame(() => {
        fps.update();
    });

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
