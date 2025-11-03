import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'motion';
import { useRef } from 'react';
import { Object3D, type InstancedMesh } from 'three';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { cssVariable } from '../../../utils/cssVariable';

const noise = new ImprovedNoise();
const quantity = 256;

interface Props {
    progress: MotionValue<number>;
}

export const HeadingMeshes = ({ progress }: Props) => {
    const instancesRef = useRef<InstancedMesh>(null);
    const dummy = new Object3D();

    useFrame((state) => {
        if (instancesRef.current) {
            const t = state.clock.getElapsedTime();

            for (let i = 0; i < quantity; ++i) {
                const n = noise.noise(i * 0.1, progress.get() * 1.7, 0);
                const scaleNoise = noise.noise(i * 0.1, t * 0.5, 0);

                const r = progress.get() * 2 + n * 1.5;
                const angle = i * 0.3 + progress.get() * 1.7;

                const x = Math.cos(angle) * r;
                const y = 0.5 * Math.sin(angle * 0.5) * r * 0.5 + n;
                const z = Math.sin(angle) * r;

                dummy.position.set(x, y, z);
                dummy.position.multiplyScalar(3);
                dummy.scale.set(
                    0.1 + scaleNoise,
                    0.1 + scaleNoise,
                    0.1 + scaleNoise
                );
                dummy.updateMatrix();
                instancesRef.current.setMatrixAt(i, dummy.matrix);
            }
            instancesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <Instances ref={instancesRef}>
            <sphereGeometry args={[0.3]} />
            <meshPhysicalMaterial
                metalness={1}
                color={cssVariable('--intro-instances-color')}
                emissive={cssVariable('--intro-instances-color')}
                emissiveIntensity={4}
            />

            {Array.from({ length: quantity }).map((_, idx) => (
                <Instance key={idx} />
            ))}
        </Instances>
    );
};
