import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stellars } from "./Stellars"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { StellarParticles } from "./StellarParticles"
import { useRef } from "react"
import { PointLight } from "three"

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

const StellarLighting = () => {
    const three = useThree();
    const lightRef = useRef<PointLight | null>(null);

    useFrame(() => {
        const pointer = three.pointer;
        
        if(lightRef.current) {
            lightRef.current.position.set(pointer.x * three.viewport.width / 2, pointer.y * three.viewport.height / 2, 1);
        }
    });

    return (
        <pointLight ref={lightRef} position={[0, 0, 1]} intensity={20}/>
    )
}