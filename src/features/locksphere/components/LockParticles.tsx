import { useRef } from 'react';
import { Points } from 'three';
import { useLockParticles } from '../hooks/useLockParticles';
import { useLocalStore } from '../../../zustand/localStore';

export const LockParticles = () => {
    const ref = useRef<Points>(null);
    const sparks = useLockParticles(ref, 1000);

    const { theme } = useLocalStore();

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    args={[sparks.positions, 3]}
                    attach='attributes-position'
                />
            </bufferGeometry>
            <pointsMaterial
                size={theme == 'dark' ? 0.01 : 0.1}
                color={theme === 'dark' ? '#fff' : '#000'}
            />
        </points>
    );
};
