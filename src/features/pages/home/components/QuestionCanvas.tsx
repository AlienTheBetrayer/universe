import { Canvas } from "@react-three/fiber"
import { QuestionParticles } from "./QuestionParticles"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

interface Props {
}

export const QuestionCanvas = ({ }: Props) => {
    return (
        <Canvas>
            <QuestionParticles/>

            <EffectComposer>
                <Bloom intensity={3} luminanceThreshold={0}/>
            </EffectComposer>
        </Canvas>
    )
}

