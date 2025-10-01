import './InteractiveParticlesCanvas.css';

import { motion } from 'motion/react';

import { Canvas } from "@react-three/fiber"
import { InteractiveParticles } from './InteractiveParticles';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useLocalStore } from '../../../zustand/localStore';

export const InteractiveParticlesCanvas = () => {
    const { theme } = useLocalStore();
    
    return (
        <motion.div className='interactive-particles-canvas-container'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1}}>
            <Canvas>
                { theme === 'dark' && (
                    <EffectComposer>
                        <Bloom intensity={30} luminanceThreshold={0.5}/>
                    </EffectComposer>
                )}

                <InteractiveParticles/>
            </Canvas>
        </motion.div>
    )
}