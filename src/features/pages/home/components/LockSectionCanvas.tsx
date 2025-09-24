import { Canvas } from '@react-three/fiber';
import { Icosahedron } from './Icosahedron';
import { type RefObject } from 'react';
import {  useScroll } from 'motion/react';
import { ForceField } from './ForceField';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

interface Props {
    ref: RefObject<HTMLDivElement | null>;
}

export const LockSectionCanvas = ({ ref }: Props) => {
    const { scrollYProgress } = useScroll({ target: ref });

    return (
        <Canvas>
            <pointLight position={[10, 10, 10]} intensity={100}/>
            <pointLight position={[-10, -10, -10]} intensity={100}/>

            <Icosahedron progress={scrollYProgress}/>
            <ForceField progress={scrollYProgress}/>

            <EffectComposer>
                <Bloom intensity={3} luminanceThreshold={0}/>
            </EffectComposer>
        </Canvas>
    )
}
