import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react"
import { Mesh } from "three"

export const CardFigure = () => {
    const ref = useRef<Mesh>(null);

    useEffect(() => {
        if(ref.current) {
            ref.current.rotation.set(Math.random() * 200, Math.random() * 200, Math.random() * 200);
        }
    }, [ref]);

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
            ref.current.rotation.z += 0.01;

            const scale = Math.sin(t) / 300;
            ref.current.scale.set(ref.current.scale.x + scale, ref.current.scale.y + scale,ref.current.scale.z + scale)
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[1.25, 0]}/>
            <meshPhysicalMaterial color='#0000ff' metalness={1} roughness={0.7}/>
        </mesh>
    )
}