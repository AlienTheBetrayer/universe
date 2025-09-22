import './HomeCanvas.css';

import { motion } from 'motion/react';

import { Canvas } from "@react-three/fiber"
import { HomeParticles } from "./HomeParticles"
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const HomeCanvas = () => {
    return (
        <motion.div className='home-canvas-container'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1}}>
            <Canvas>
                <EffectComposer>
                    <Bloom intensity={30} luminanceThreshold={0.5}/>
                </EffectComposer>

                <HomeParticles/>
            </Canvas>
        </motion.div>
    )
}