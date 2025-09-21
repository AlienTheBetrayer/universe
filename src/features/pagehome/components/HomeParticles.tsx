import { useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react"

interface Props {
    count?: number;
}

export const HomeParticles = ({ count=2000 }: Props) => {
    const pointsRef = useRef(null);

    // 
    const { width, height } = useThree().viewport;

    // calculating the positions of each and every particle
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);

        for(let i = 0; i < count; ++i) {
            arr[i * 3] = (Math.random() - 0.5) * width;
            arr[i * 3 + 1] = (Math.random() - 0.5) * height;
            arr[i * 3 + 2] = (Math.random() - 0.5);
        }

        return arr;
    }, [count, width, height]);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute args={[positions, 3]} attach='attributes-position'/>
            </bufferGeometry>
            <pointsMaterial color='#fff' size={0.03}/>
        </points>
    )
}