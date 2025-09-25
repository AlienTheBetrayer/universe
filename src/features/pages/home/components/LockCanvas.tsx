import { Canvas } from '@react-three/fiber';
import { LockFigure } from './LockFigure';
import { type RefObject } from 'react';
import { useScroll } from 'motion/react';
import { ForceField } from './ForceField';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import { useScrollYWithin } from '../../../../hooks/useScrollYWithin';

interface Props {
    ref: RefObject<HTMLElement | null>;
}

export const LockCanvas = ({ ref }: Props) => {
    const { scrollYProgress } = useScroll({ target: ref });
    const scrolledWithin = useScrollYWithin(0, 1, scrollYProgress);

    return (
        <Canvas>
            <pointLight position={[10, 10, 10]} intensity={100}/>
            <pointLight position={[-10, -10, -10]} intensity={100}/>

            <LockFigure progress={scrollYProgress}/>
            <ForceField progress={scrollYProgress}/>

            { scrolledWithin && (
                <EffectComposer>
                    <Bloom intensity={3} luminanceThreshold={0}/>
                </EffectComposer>
            )}

            <OrbitControls enableZoom={false} enablePan={false}/>
        </Canvas>
    )
}
