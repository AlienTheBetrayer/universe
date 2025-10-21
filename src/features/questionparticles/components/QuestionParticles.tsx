import { useRef } from 'react';
import { Points } from 'three';
import { useQuestionParticles } from '../hooks/useQuestionParticles';
import { useLocalStore } from '../../../zustand/localStore';

export const QuestionParticles = () => {
    const pointsRef = useRef<Points>(null);
    const particles = useQuestionParticles(pointsRef, 1000);
    const { theme } = useLocalStore();

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    args={[particles.positions, 2]}
                    attach='attributes-position'
                />
            </bufferGeometry>

            <pointsMaterial
                size={theme === 'dark' ? 0.01 : 0.05}
                color={theme === 'dark' ? '#fff' : '#000'}
            />
        </points>
    );
};
