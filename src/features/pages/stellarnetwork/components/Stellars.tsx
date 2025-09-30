import { useThree } from "@react-three/fiber";
import type { Object3D, Object3DEventMap } from "three";
import gsap from "gsap"
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";

export const Stellars = () => {
    const [data, setData] = useStellarContext();
    const three = useThree();
    
    // generating random xy
    useStellarPositions(data, setData, three.viewport);
    

    // handling selection + camera zoom in
    const handle = (object: Object3D<Object3DEventMap>, idx: number) => {
        const position = data.selected !== idx ? [object.position.x, object.position.y, 0.12] : [0, 0, 5];
        // setSelected(prev => prev === idx ? -1 : idx);
        setData(prev => ({ ...prev, selected: prev.selected === idx ? -1 : idx}))
        gsap.timeline().to(three.camera.position, { x: position[0], y: position[1], z: position[2], duration: 2, ease: 'circ.inOut' })
    }

    return (
        data.stellars.map((stellar, idx) => (
            <mesh key={idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]} onClick={(e) => handle(e.object, idx)}>
                <sphereGeometry args={[0.05]}/>
                <meshPhysicalMaterial color={`${data.selected !== idx ? '#fff' : '#66a'}`} wireframe/>
            </mesh>
        ))
    )
}