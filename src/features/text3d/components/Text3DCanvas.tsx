import './Text3DCanvas.css';
import { Canvas } from '@react-three/fiber';
import { motion } from 'motion/react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import { Text3DContent } from './Text3DContent';
import { Text3DParticles } from './Text3DParticles';
import { Text3DLighting } from './Text3DLighting';
import React from 'react';

interface Props {
    children?: string;
}

export const Text3DCanvas = React.memo(({ children }: Props) => {
    return (
        <motion.div
            className='text3d-canvas'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
        >
            <Canvas style={{ width: '100%', height: '100%' }}>
                <Text3DLighting />
                <Text3DContent text={children} />
                <Text3DParticles />

                <EffectComposer>
                    <Bloom intensity={4} luminanceThreshold={0} />
                </EffectComposer>

                <OrbitControls
                    dampingFactor={0.01}
                    enablePan={false}
                    enableZoom={false}
                />
            </Canvas>
        </motion.div>
    );
});
