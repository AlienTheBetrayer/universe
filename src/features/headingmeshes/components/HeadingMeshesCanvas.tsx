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
}

export const HeadingMeshesCanvas = React.memo(({ progress }: Props) => {
    const { theme } = useLocalStore();

    // fps optimization
    const isMobile = useMediaQuery(640);
    const performanceTimeout = useRef<number | false>(false);
    const [isLagging, setIsLagging] = useState<boolean>(false);

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

            {theme === 'dark' && isLagging && (
                <motion.div
                    className='interactive-particles-fps-warning'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p>
                        <small>
                            Effects <u>reduced!</u>
                        </small>
                    </p>
                </motion.div>
            )}

            <Canvas style={{ width: '100%', height: '100%' }}>
                <pointLight position={[0, 0, 0]} intensity={24} />

                {theme === 'dark' && !isMobile && !isLagging && (
                    <EffectComposer>
                        <Bloom emissiveThreshold={0} />
                    </EffectComposer>
                )}

                <Center>
                    <HeadingMeshes
                        progress={progress}
                        onFPSUpdate={(fps) => {
                            if (fps < 20) {
                                performanceTimeout.current = setTimeout(
                                    () => setIsLagging(true),
                                    1000
                                );
                            } else if (performanceTimeout.current !== false) {
                                clearTimeout(performanceTimeout.current);
                                performanceTimeout.current = false;
                            }
                        }}
                    />
                </Center>
            </Canvas>
        </motion.div>
    );
});
