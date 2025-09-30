import { useFrame, useThree } from "@react-three/fiber";
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";
import { useStellarCamera } from "../hooks/useStellarCamera";
import { useRef } from "react";
import { Mesh } from "three";

export const Stellars = () => {
    const [data, setData] = useStellarContext();
    const three = useThree();
    
    // generating random xy
    useStellarPositions(data, setData, three.viewport);

    // onclick camera focus handling
    useStellarCamera(data, three.camera);
    
    // rotating the currently selected stellar
    const refs = useRef<Mesh[]>([]);
    useFrame(() => {
        if(data.selected !== -1) {
            refs.current[data.selected].rotation.x += 0.01;
            refs.current[data.selected].rotation.y += 0.01;
            refs.current[data.selected].rotation.z += 0.01;
        }
    });

    return (
        data.stellars.map((stellar, idx) => (
            <mesh ref={(el) => (refs.current[idx] = el!)} key={idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]} 
            onClick={() => setData(prev => ({ ...prev, selected: prev.selected === idx ? -1 : idx}))}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>
                <sphereGeometry args={[0.06]}/>
                <meshPhysicalMaterial color={`${data.selected === idx ? '#66a' : '#fff'}`} wireframe/>
            </mesh>
        ))
    )
}