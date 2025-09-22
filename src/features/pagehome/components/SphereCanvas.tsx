import { Canvas } from '@react-three/fiber';
import './SphereCanvas.css';
import { Sphere } from './Sphere';
import { useRef } from 'react';
import { useScroll } from 'motion/react';

export const SphereCanvas = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef });

    return (
        <div ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <Canvas>
                    <pointLight position={[10, 10, 10]} intensity={100}/>
                    <pointLight position={[-10, -10, -10]} intensity={100}/>

                    <Sphere progress={scrollYProgress}/>
                </Canvas>
            </div>
        </div>
    )
}