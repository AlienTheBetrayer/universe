import { Canvas } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { StellarLighting } from "./StellarLighting"
import { StellarParticles } from "./StellarParticles"
import { Stellars } from "./Stellars"
import { useStellarContextMenu } from "../hooks/useStellarContextMenu"

export const StellarCanvas = () => {
    const contextMenu = useStellarContextMenu();

    const handle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        contextMenu.popup.setShown(false);
        setTimeout(() => contextMenu.popup.setShown(true), 10);
    }

    return (
        <>
            <Canvas style={{ width: '100%', height: '100%'}} camera={{ near: 0.001 }}
            onContextMenu={handle}
            onClick={() => contextMenu.popup.setShown(false)}>
                <StellarLighting/>
                <StellarParticles/>
                <Stellars/>

                <EffectComposer>
                    <Bloom intensity={20} luminanceThreshold={0}/>
                </EffectComposer>
            </Canvas>

            { contextMenu.popup.render() }
        </>
    )
}