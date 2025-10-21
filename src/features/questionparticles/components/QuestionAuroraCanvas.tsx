import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { QuestionAuroraParticles } from './QuestionAuroraParticles';

interface Props {}

export const QuestionAuroraCanvas = ({}: Props) => {
    return (
        <Canvas>
            <QuestionAuroraParticles />

            <EffectComposer>
                <Bloom intensity={300} luminanceThreshold={0} />
            </EffectComposer>
        </Canvas>
    );
};
