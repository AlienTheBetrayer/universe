import { Canvas } from "@react-three/fiber"
import { QuestionAuroraParticles } from "./QuestionAuroraParticles"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

export const QuestionAuroraCanvas = () => {
    return (
        <Canvas>
            <QuestionAuroraParticles/>

            <EffectComposer>
                <Bloom intensity={300} luminanceThreshold={0}/>
            </EffectComposer>
        </Canvas>
    )
}