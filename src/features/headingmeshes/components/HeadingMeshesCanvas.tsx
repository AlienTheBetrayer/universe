import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import './HeadingMeshesCanvas.css';

import { Center } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { motion, MotionValue } from 'motion/react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useLocalStore } from '../../../zustand/localStore';
import { HeadingMeshes } from './HeadingMeshes';

interface Props {
    progress: MotionValue<number>;
    isVisible: boolean;
}

export const HeadingMeshesCanvas = React.memo(
    ({ progress, isVisible }: Props) => {
        const { theme } = useLocalStore();

        // fps optimization
        const isMobile = useMediaQuery(640);
        const performanceTimeout = useRef<number | false>(false);
        const dprTimeout = useRef<number | false>(false);
        const [dpr, setDPR] = useState<number>(window.devicePixelRatio);
        const [isLagging, setIsLagging] = useState<boolean>(false);
        const [isLaggingDisabled, setIsLaggingDisabled] =
            useState<boolean>(false);
        const isMac = /Mac|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent);

        return (
            <motion.div
                className='heading-meshes-canvas'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: 1 }}
            >
                {isVisible && (
                    <>
                        <motion.div
                            className='meshes-bgtext'
                            initial={{ opacity: 0, filter: 'blur(40px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 3 }}
                        >
                            <span>DESTINY</span>
                        </motion.div>

                        {theme === 'dark' &&
                            isLagging &&
                            !isMobile &&
                            !isLaggingDisabled &&
                            !isMac && (
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

                        <Canvas
                            style={{ width: '100%', height: '100%' }}
                            dpr={dpr}
                        >
                            <pointLight position={[0, 0, 0]} intensity={24} />

                            {theme === 'dark' &&
                                !isMobile &&
                                (!isLagging || isLaggingDisabled) &&
                                !isMac && (
                                    <EffectComposer>
                                        <Bloom emissiveThreshold={0} />
                                    </EffectComposer>
                                )}

                            <Center>
                                <HeadingMeshes
                                    progress={progress}
                                    onFPSUpdate={(fps) => {
                                        if (fps < 30) {
                                            if (
                                                performanceTimeout.current ===
                                                false
                                            ) {
                                                performanceTimeout.current =
                                                    setTimeout(
                                                        () =>
                                                            setIsLagging(true),
                                                        3000
                                                    );
                                            }

                                            if (
                                                isLagging &&
                                                !isLaggingDisabled &&
                                                dprTimeout.current === false
                                            ) {
                                                dprTimeout.current = setTimeout(
                                                    () => {
                                                        setDPR(
                                                            (prev) => prev / 2
                                                        );
                                                        if (dprTimeout.current)
                                                            clearTimeout(
                                                                dprTimeout.current
                                                            );
                                                    },
                                                    3000
                                                );
                                            }
                                        } else {
                                            if (
                                                performanceTimeout.current &&
                                                dprTimeout.current
                                            ) {
                                                clearTimeout(
                                                    performanceTimeout.current
                                                );
                                                clearTimeout(
                                                    dprTimeout.current
                                                );
                                            }
                                        }
                                    }}
                                />
                            </Center>
                        </Canvas>
                    </>
                )}
            </motion.div>
        );
    }
);
