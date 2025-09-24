import { Canvas } from '@react-three/fiber';
import { Icosahedron } from './Icosahedron';
import { useState, type RefObject } from 'react';
import {  useScroll } from 'motion/react';
import { ForceField } from './ForceField';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';

interface Props {
    ref: RefObject<HTMLElement | null>;
}

export const LockSectionCanvas = ({ ref }: Props) => {
    const { scrollYProgress } = useScroll({ target: ref });
    const [bloomVisible, setBloomVisible] = useState<boolean>(false);

    scrollYProgress.on('change', val => setBloomVisible(val > 0 && val < 1));

    return (
        <Canvas>
            <pointLight position={[10, 10, 10]} intensity={100}/>
            <pointLight position={[-10, -10, -10]} intensity={100}/>

            <Icosahedron progress={scrollYProgress}/>
            <ForceField progress={scrollYProgress}/>

            { bloomVisible && (
                <EffectComposer>
                    <Bloom intensity={3} luminanceThreshold={0}/>
                </EffectComposer>
            )}

            <OrbitControls enableZoom={false} enablePan={false}/>
        </Canvas>
    )
}
