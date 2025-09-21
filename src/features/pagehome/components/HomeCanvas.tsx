import './HomeCanvas.css';

import { Canvas } from "@react-three/fiber"
import { HomeParticles } from "./HomeParticles"
import { CameraControls } from '@react-three/drei';

export const HomeCanvas = () => {
    return (
        <Canvas className='home-canvas'>
            <ambientLight intensity={1}/>
            <HomeParticles/>

            <CameraControls/>
        </Canvas>
    )
}