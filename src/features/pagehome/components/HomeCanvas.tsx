import './HomeCanvas.css';

import { Canvas } from "@react-three/fiber"
import { HomeParticles } from "./HomeParticles"

import { motion } from 'motion/react';

export const HomeCanvas = () => {
    return (
        <motion.div
        initial={{opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 200, damping: 200 }}
        className='home-canvas-container'>
            <h1>The beginning of something great</h1>
            
            <Canvas>
                <HomeParticles/>
            </Canvas>
        </motion.div>
    )
}