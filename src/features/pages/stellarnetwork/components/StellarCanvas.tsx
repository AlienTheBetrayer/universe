import { Canvas } from "@react-three/fiber"
import gsap from "gsap"
import { StellarParticles } from "./StellarParticles"

export const StellarCanvas = () => {

    return (
        <Canvas style={{ width: '100%', height: '100%'}}>
            <ambientLight/>
            <StellarParticles/>
        </Canvas>
    )
}