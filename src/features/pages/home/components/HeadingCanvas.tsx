import './HeadingCanvas.css';

import { motion } from 'motion/react';

import { Canvas } from "@react-three/fiber"
import { HeadingParticles } from "./HeadingParticles"
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const HeadingCanvas = () => {
    return (
        <motion.div className='particles-canvas-container'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1}}>
            <Canvas>
                <EffectComposer>
                    <Bloom intensity={30} luminanceThreshold={0.5}/>
                </EffectComposer>

                <HeadingParticles/>
            </Canvas>
        </motion.div>
    )
}