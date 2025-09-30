import { useFrame, useThree } from "@react-three/fiber";
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";
import { useStellarCamera } from "../hooks/useStellarCamera";
import { useRef } from "react";
import { Mesh } from "three";
import { Edges } from "@react-three/drei";
import { useStellarHotkeys } from "../hooks/useStellarHotkeys";

export const Stellars = () => {
    const [state, dispatch] = useStellarContext();
    const three = useThree();
    
    // generating random xy
    useStellarPositions(three.viewport);

    // onclick camera focus handling
    useStellarCamera(three.camera);

    // hotkeys handling
    useStellarHotkeys();
    
    // rotating the currently selected stellar
    const refs = useRef<Mesh[]>([]);
    useFrame(() => {
        if(state.selected !== -1) {
            refs.current[state.selected].rotation.x += 0.01;
            refs.current[state.selected].rotation.y += 0.01;
            refs.current[state.selected].rotation.z += 0.01;
        }
    });

    return (
        state.stellars.map((stellar, idx) => (
            <mesh ref={(el) => (refs.current[idx] = el!)} key={idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]} 
            onClick={() => dispatch({ type: 'select', idx: idx }) }
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>
                <sphereGeometry args={[0.06]}/>
                <meshPhysicalMaterial color={`${state.selected === idx ? '#66a' : '#fff'}`} wireframe/>

                <Edges scale={1.1} color='#f00'/>
            </mesh>
        ))
    )
}