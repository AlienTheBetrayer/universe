import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { PointLight } from "three";

export const StellarLighting = () => {
    const three = useThree();
    const lightRef = useRef<PointLight | null>(null);

    useFrame(state => {
        if(lightRef.current) {
            const t = state.clock.getElapsedTime();
            const pointer = three.pointer;

            lightRef.current.position.set(pointer.x * three.viewport.width / 2, pointer.y * three.viewport.height / 2, 1 + Math.sin(t));
        }
    });

    return (
        <pointLight ref={lightRef} position={[0, 0, 1]} intensity={10}/>
    )
}