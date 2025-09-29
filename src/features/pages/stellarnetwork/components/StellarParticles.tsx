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
        const position = selected !== idx ? [object.position.x, object.position.y, 0.12] : [0, 0, 5];
        setSelected(prev => prev === idx ? -1 : idx);
        
        gsap.timeline().to(camera.position, { x: position[0], y: position[1], z: position[2], duration: 2, ease: 'circ.inOut' })
        
    }

    return (
        data.stellars.map((stellar, idx) => (
            <mesh key={idx} position={[stellar.x, stellar.y, 0]} onClick={(e) => handle(e.object, idx)}>
                <sphereGeometry args={[0.05]}/>
                <meshPhysicalMaterial color={`${selected !== idx ? '#fff' : '#66a'}`} wireframe/>
            </mesh>
        ))
    )
}