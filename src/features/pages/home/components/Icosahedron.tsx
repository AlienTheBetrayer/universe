import type { MotionValue } from "motion";
import { useSpring } from "motion/react";
import { useState } from "react";

interface Props {
    progress: MotionValue<number>;
}

export const Icosahedron = ({ progress }: Props) => {
    const [scale, setScale] = useState<number>(0);

    const springed = useSpring(progress, { stiffness: 1000, damping: 40 });
    springed?.on('change', value => {
        setScale(value);
    });

    return (
        <mesh>
            <icosahedronGeometry args={[1 + scale * 7, 0]}/>
            <meshPhysicalMaterial color='#0000ff'/>
        </mesh>
    )
}