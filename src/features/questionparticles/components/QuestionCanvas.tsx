import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React from 'react';
import { QuestionParticles } from './QuestionParticles';

export const QuestionCanvas = React.memo(() => {
    return (
        <Canvas>
            <QuestionParticles />

            <EffectComposer>
                <Bloom intensity={3} luminanceThreshold={0} />
            </EffectComposer>
        </Canvas>
    );
});
