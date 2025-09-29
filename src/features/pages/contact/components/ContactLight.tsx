import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { PointLight } from "three"

export const ContactLight = () => {
    const ref = useRef<PointLight>(null);

    useFrame(state => {
        const t = state.clock.getElapsedTime();

        if(ref.current) {
            ref.current.position.x = -2 + Math.sin(t);
            ref.current.position.y = 1 + Math.sin(t);
            ref.current.position.z = 1 + Math.sin(t);
        }
    });

    return (
        <pointLight ref={ref} position={[ -2, 1, 1]} intensity={2}/>
    )
}