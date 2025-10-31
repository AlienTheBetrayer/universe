import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useScroll } from 'motion/react';
import React, { type RefObject } from 'react';
import { useScrollYWithin } from '../../../hooks/useScrollYWithin';
import { ForceField } from './ForceField';
import { LockFigure } from './LockFigure';

interface Props {
    ref: RefObject<HTMLElement | null>;
}

export const LockCanvas = React.memo(({ ref }: Props) => {
    const { scrollYProgress } = useScroll({ target: ref });
    const scrolledWithin = useScrollYWithin(0, 1, scrollYProgress);

    return (
        <Canvas style={{ pointerEvents: 'none' }}>
            <pointLight position={[10, 10, 10]} intensity={100} />
            <pointLight position={[-10, -10, -10]} intensity={100} />

            <LockFigure progress={scrollYProgress} />
            <ForceField progress={scrollYProgress} />

            {scrolledWithin && (
                <EffectComposer>
                    <Bloom intensity={5} luminanceThreshold={0} />
                </EffectComposer>
            )}
        </Canvas>
    );
});
