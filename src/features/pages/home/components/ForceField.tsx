import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Mesh } from "three"

export const ForceField = () => {
    const ref = useRef<Mesh>(null);

    useFrame(() => {
        if(ref.current) {
            ref.current.rotation.x += 0.005;
            ref.current.rotation.y += 0.005;
            ref.current.rotation.z += 0.005;
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[2.5, 2]}/>
            <meshPhysicalMaterial color='#6868d2' wireframe/>
        </mesh>
    )
}