import { useState } from "react";
import { useStellars } from "../hooks/useStellars"
import { useThree } from "@react-three/fiber";
import type { Object3D, Object3DEventMap } from "three";
import gsap from "gsap"

export const StellarParticles = () => {
    const data = useStellars();
    const [selected, setSelected] = useState<number>(-1);
    const { camera } = useThree();

    const handle = (object: Object3D<Object3DEventMap>, idx: number) => {
        setSelected(idx);
        gsap.timeline().to(camera.position, { x: object.position.x, y: object.position.y, z: 0.12, duration: 2, ease: 'circ.out' })
        
    }

    return (
        data.stellars.map((stellar, idx) => (
            <mesh key={idx} position={[stellar.x, stellar.y, 0]} onClick={(e) => handle(e.object, idx)}>
                <sphereGeometry args={[0.03]}/>
                <meshPhysicalMaterial color={`${selected !== idx ? '#fff' : '#66a'}`} wireframe/>
            </mesh>
        ))
    )
}