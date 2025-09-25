import { useRef } from "react";
import { useSparks } from "../hooks/useSparks"
import { Points } from "three";
import { useAppStore } from "../../../../zustand/store";

export const Sparks = () => {
    const ref = useRef<Points>(null);
    const sparks = useSparks(ref, 1000);

    const { theme } = useAppStore();
    const dotColor = theme === 'dark' ? '#fff' : '#000';

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute args={[sparks.positions, 3]} attach='attributes-position'/>
            </bufferGeometry>
            <pointsMaterial size={0.01} color={dotColor}/>
        </points>
    )
}