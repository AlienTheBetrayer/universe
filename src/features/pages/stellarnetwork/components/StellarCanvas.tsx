import { Canvas } from "@react-three/fiber"
import { Stellars } from "./Stellars"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { StellarParticles } from "./StellarParticles"
import { StellarLighting } from "./StellarLighting"

export const StellarCanvas = () => {

    return (
        <Canvas style={{ width: '100%', height: '100%'}} camera={{ near: 0.001 }}>
            <StellarLighting/>
            <StellarParticles/>
            <Stellars/>

            <EffectComposer>
                <Bloom intensity={20} luminanceThreshold={0}/>
            </EffectComposer>
        </Canvas>
    )
}