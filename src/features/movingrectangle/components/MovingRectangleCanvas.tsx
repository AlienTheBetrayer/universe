import { Canvas } from '@react-three/fiber';
import { MovingRectangle } from './MovingRectangle';
import type { MotionValue } from 'motion';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { MovingRectangleAberation } from './MovingRectangleAberation';
import { useRef } from 'react';

interface Props {
    progress: MotionValue<number>;
}

export const MovingRectangleCanvas = ({ progress }: Props) => {
    const hovered = useRef<boolean>(false);

    return (
        <Canvas
            onPointerOver={() => (hovered.current = true)}
            onPointerLeave={() => (hovered.current = false)}
        >
            <EffectComposer>
                <Bloom luminanceThreshold={0.5} intensity={2} />
                <MovingRectangleAberation shown={hovered} />
            </EffectComposer>

            <pointLight position={[-2, 1, 1]} intensity={8} />
            <pointLight position={[4, 1, 0]} intensity={8} />
            <pointLight position={[-4, -1, 4]} intensity={2} />
            <MovingRectangle progress={progress} />
        </Canvas>
    );
};
