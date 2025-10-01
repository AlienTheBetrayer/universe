import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react"
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

            const scale = Math.sin(t) / 10;
            ref.current.scale.set(1.15 + scale, 1.15 + scale,1.15 + scale)
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[2, 0]}/>
            <meshPhysicalMaterial color='#7474bc' metalness={1} roughness={1}/>
        </mesh>
    )
}