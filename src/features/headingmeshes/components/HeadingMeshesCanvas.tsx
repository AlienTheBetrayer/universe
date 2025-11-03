import { Canvas } from '@react-three/fiber';
import React from 'react';
import './HeadingMeshesCanvas.css';

import { Center } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { motion, MotionValue } from 'motion/react';
import { useLocalStore } from '../../../zustand/localStore';
import { HeadingMeshes } from './HeadingMeshes';

interface Props {
    progress: MotionValue<number>;
}

export const HeadingMeshesCanvas = React.memo(({ progress }: Props) => {
    const localStore = useLocalStore();

    return (
        <motion.div
            className='heading-meshes-canvas'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
        >
            <motion.div
                className='meshes-bgtext'
                initial={{ opacity: 0, filter: 'blur(40px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 3 }}
            >
                <span>DESTINY</span>
            </motion.div>
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
