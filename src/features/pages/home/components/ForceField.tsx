import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion";
import { useRef } from "react"
import { Mesh, MeshPhysicalMaterial } from "three"
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

interface Props {
    progress: MotionValue<number>;
}

export const ForceField = ({ progress }: Props) => {
    const ref = useRef<Mesh>(null);
    const isMobile = useMediaQuery(640);

    useFrame(() => {
        if(ref.current) {
            ref.current.rotation.x += 0.001 + progress.get() / 100;
            ref.current.rotation.y += 0.001 + progress.get() / 100;
            ref.current.rotation.z += 0.001 + progress.get() / 100;

            const material = ref.current.material as MeshPhysicalMaterial;
            material.color.r = progress.get();
            material.color.b = 1 - progress.get();

            const scale = 1 + progress.get() / 10;
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[isMobile ? 1.3 : 2.7, 2]}/>
            <meshPhysicalMaterial color='#6868d2' wireframe/>
        </mesh>
    )
}