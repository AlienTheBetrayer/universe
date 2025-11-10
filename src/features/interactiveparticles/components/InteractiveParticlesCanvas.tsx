import './InteractiveParticlesCanvas.css';

import { motion } from 'motion/react';

import { Canvas } from '@react-three/fiber';
import { InteractiveParticles } from './InteractiveParticles';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useLocalStore } from '../../../zustand/localStore';
import { useInteractiveParticlesContext } from '../context/InteractiveParticlesContext';
import React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export const InteractiveParticlesCanvas = React.memo(() => {
    const { theme } = useLocalStore();
    const [context] = useInteractiveParticlesContext();

    // fps optimization
    const isMobile = useMediaQuery(640);

    return (
        <motion.div
            className='interactive-particles-canvas-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
        >
            <Canvas>
                {theme === 'dark' && context.bloomStrength > 0 && !isMobile && (
                    <EffectComposer>
                        <Bloom
                            intensity={context.bloomStrength}
                            luminanceThreshold={0.5}
                        />
                    </EffectComposer>
                )}

                <InteractiveParticles />
            </Canvas>
        </motion.div>
    );
});
