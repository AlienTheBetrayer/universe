import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Mesh } from "three"

export const Sphere = () => {
    const ref = useRef<Mesh>(null);

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
            ref.current.rotation.z += 0.01;
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[2]}/>
            <meshBasicMaterial wireframe color='#0000ff'/>
        </mesh>
    )
}