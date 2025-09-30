import { useThree } from "@react-three/fiber";
import type { Object3D, Object3DEventMap } from "three";
import gsap from "gsap"
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";
import { useStellarCamera } from "../hooks/useStellarCamera";

export const Stellars = () => {
    const [data, setData] = useStellarContext();
    const three = useThree();
    
    // generating random xy
    useStellarPositions(data, setData, three.viewport);

    // onclick camera focus handling
    useStellarCamera(data, three.camera);

    return (
        data.stellars.map((stellar, idx) => (
            <mesh key={idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]} onClick={() => setData(prev => ({ ...prev, selected: prev.selected === idx ? -1 : idx }))}>
                <sphereGeometry args={[0.05]}/>
                <meshPhysicalMaterial color={`${data.selected === idx ? '#66a' : '#fff'}`} wireframe/>
            </mesh>
        ))
    )
}