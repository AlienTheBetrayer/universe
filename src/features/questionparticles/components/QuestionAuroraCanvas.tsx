import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React from 'react';
import { QuestionAuroraParticles } from './QuestionAuroraParticles';

export const QuestionAuroraCanvas = React.memo(() => {
    return (
        <Canvas>
            <QuestionAuroraParticles />

            <EffectComposer>
                <Bloom intensity={300} luminanceThreshold={0} />
            </EffectComposer>
        </Canvas>
    );
});
