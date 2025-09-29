import { Canvas } from "@react-three/fiber"
import { StellarParticles } from "./StellarParticles"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

export const StellarCanvas = () => {

    return (
        <Canvas style={{ width: '100%', height: '100%'}}>
            <ambientLight/>
            <StellarParticles/>

            <EffectComposer>
                <Bloom intensity={20} luminanceThreshold={0}/>
            </EffectComposer>
        </Canvas>
    )
}