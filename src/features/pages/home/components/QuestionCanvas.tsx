import { Canvas } from "@react-three/fiber"
import { QuestionParticles } from "./QuestionParticles"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

interface Props {
    renderBloom?: boolean;
}

export const QuestionCanvas = ({ renderBloom }: Props) => {
    return (
        <Canvas>
            <QuestionParticles/>

            { renderBloom && (
                <EffectComposer>
                    <Bloom intensity={3} luminanceThreshold={0}/>
                </EffectComposer>
            )}
        </Canvas>
    )
}

