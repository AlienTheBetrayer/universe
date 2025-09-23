import { Canvas } from '@react-three/fiber';
import './SphereCanvas.css';
import { Sphere } from './Sphere';
import { type RefObject } from 'react';
import { useScroll } from 'motion/react';

interface Props {
    ref: RefObject<HTMLDivElement | null>;
}

export const SphereCanvas = ({ ref }: Props) => {
    const { scrollYProgress } = useScroll({ target: ref });

    return (
        <Canvas>
            <pointLight position={[10, 10, 10]} intensity={100}/>
            <pointLight position={[-10, -10, -10]} intensity={100}/>

            <Sphere progress={scrollYProgress}/>
        </Canvas>
    )
}