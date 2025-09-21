import './HomeCanvas.css';

import { Canvas } from "@react-three/fiber"
import { HomeParticles } from "./HomeParticles"

export const HomeCanvas = () => {
    return (
        <div className='home-canvas-container'>
            <Canvas>
                <HomeParticles/>
            </Canvas>
        </div>
    )
}