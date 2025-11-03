import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';

import { Center } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { motion, useScroll, useSpring } from 'motion/react';
import { useLocalStore } from '../../../zustand/localStore';
import { HeadingMeshes } from './HeadingMeshes';

export const HeadingMeshesCanvas = React.memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const progress = useSpring(scrollYProgress, { stiffness: 40, damping: 40 });
    const localStore = useLocalStore();

    return (
        <motion.div
            ref={containerRef}
            style={{ position: 'absolute', inset: '0', overflow: 'hidden' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
        >
            <Canvas style={{ width: '100%', height: '100%' }}>
                <pointLight position={[0, 0, 0]} intensity={24} />

                {localStore.theme === 'dark' && (
                    <EffectComposer>
                        <Bloom emissiveThreshold={0} />
                    </EffectComposer>
                )}

                <Center>
                    <HeadingMeshes progress={progress} />
                </Center>
            </Canvas>
        </motion.div>
    );
});
