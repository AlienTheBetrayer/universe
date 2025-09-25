import { Canvas } from "@react-three/fiber"
import { QuestionAuroraParticles } from "./QuestionAuroraParticles"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

interface Props {
    renderBloom?: boolean;
}

export const QuestionAuroraCanvas = ({ renderBloom }: Props) => {
    return (
        <Canvas>
            <QuestionAuroraParticles/>

            { renderBloom && (
                <EffectComposer>
                    <Bloom intensity={300} luminanceThreshold={0}/>
                </EffectComposer>
            )}
        </Canvas>
    )
}