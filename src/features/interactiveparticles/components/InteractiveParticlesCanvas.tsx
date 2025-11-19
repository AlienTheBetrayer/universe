import './InteractiveParticlesCanvas.css';

import { motion } from 'motion/react';

import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { useRef, useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useLocalStore } from '../../../zustand/localStore';
import { useInteractiveParticlesContext } from '../context/InteractiveParticlesContext';
import { InteractiveParticles } from './InteractiveParticles';

interface Props {
    isVisible: boolean;
}

export const InteractiveParticlesCanvas = React.memo(({ isVisible }: Props) => {
    const { theme } = useLocalStore();
    const [context] = useInteractiveParticlesContext();

    // fps optimization
    const isMobile = useMediaQuery(640);
    const performanceTimeout = useRef<number | false>(false);
    const dprTimeout = useRef<number | false>(false);
    const [dpr, setDPR] = useState<number>(1);
    const [isLagging, setIsLagging] = useState<boolean>(false);
    const [isLaggingDisabled, setIsLaggingDisabled] = useState<boolean>(false);

    return (
        <motion.div
            className='interactive-particles-canvas-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
        >
            {isVisible && (
                <>
                    {theme === 'dark' &&
                        isLagging &&
                        !isMobile &&
                        !isLaggingDisabled && (
                            <motion.button
                                className='interactive-particles-fps-warning'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => setIsLaggingDisabled(true)}
                            >
                                <p>
                                    <small>
                                        Effects <u>reduced!</u>
                                    </small>
                                </p>
                            </motion.button>
                        )}
                    <Canvas dpr={dpr}>
                        {theme === 'dark' &&
                            context.bloomStrength > 0 &&
                            !isMobile &&
                            (!isLagging || isLaggingDisabled) && (
                                <EffectComposer>
                                    <Bloom
                                        intensity={context.bloomStrength}
                                        luminanceThreshold={0.5}
                                    />
                                </EffectComposer>
                            )}

                        <InteractiveParticles
                            onFPSUpdate={(fps) => {
                                if (fps < 20) {
                                    if (performanceTimeout.current === false) {
                                        performanceTimeout.current = setTimeout(
                                            () => setIsLagging(true),
                                            3000
                                        );
                                    }

                                    if (isLagging && !isLaggingDisabled && dprTimeout.current === false) {
                                        dprTimeout.current = setTimeout(() => {
                                            setDPR((prev) => prev / 2);
                                            if (dprTimeout.current)
                                                clearTimeout(
                                                    dprTimeout.current
                                                );
                                        }, 3000);
                                    }
                                } else {
                                    if (
                                        performanceTimeout.current &&
                                        dprTimeout.current
                                    ) {
                                        clearTimeout(
                                            performanceTimeout.current
                                        );
                                        clearTimeout(dprTimeout.current);
                                    }
                                }
                            }}
                        />
                    </Canvas>
                </>
            )}
        </motion.div>
    );
});
