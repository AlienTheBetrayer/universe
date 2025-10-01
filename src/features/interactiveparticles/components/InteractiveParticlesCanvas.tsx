import './InteractiveParticlesCanvas.css';

import { motion } from 'motion/react';

import { Canvas } from "@react-three/fiber"
import { InteractiveParticles } from './InteractiveParticles';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const InteractiveParticlesCanvas = () => {
    return (
        <motion.div className='interactive-particles-canvas-container'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1}}>
            <Canvas>
                <EffectComposer>
                    <Bloom intensity={30} luminanceThreshold={0.5}/>
                </EffectComposer>

                <InteractiveParticles/>
            </Canvas>
        </motion.div>
    )
}