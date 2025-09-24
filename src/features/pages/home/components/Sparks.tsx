import { useRef } from "react";
import { useSparks } from "../hooks/useSparks"
import { Points } from "three";

export const Sparks = () => {
    const ref = useRef<Points>(null);

    const sparks = useSparks(ref, 3000);
    console.log(sparks.positions);
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute args={[sparks.positions, 3]} attach='attributes-position'/>
            </bufferGeometry>
            <pointsMaterial size={0.01}/>
        </points>
    )
}