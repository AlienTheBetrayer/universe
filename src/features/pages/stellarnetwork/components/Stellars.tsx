import { useFrame, useThree } from "@react-three/fiber";
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";
import { useStellarCamera } from "../hooks/useStellarCamera";
import { useRef } from "react";
import { Mesh } from "three";
import { Edges, type EdgesRef } from "@react-three/drei";
import { useStellarHotkeys } from "../hooks/useStellarHotkeys";
import { useStellarHover } from "../hooks/useStellarHover";

export const Stellars = () => {
    const [state, dispatch] = useStellarContext();
    const three = useThree();
    
    // generating random xy
    useStellarPositions(three.viewport);

    // onclick camera focus handling
    useStellarCamera(three.camera);

    // hotkeys handling
    useStellarHotkeys();

    // hover handling
    useStellarHover();

    useFrame(state => {
        const t = state.clock.getElapsedTime();
        three.camera.rotation.x = Math.sin(t) / 300;
        three.camera.rotation.y = Math.sin(t) / 300;
        three.camera.rotation.z = Math.sin(t) / 300;
    });
    
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
            onPointerOver={() => dispatch({ type: 'hover', idx: idx })}
            onPointerOut={() => dispatch({ type: 'unhover' })}>
                <sphereGeometry args={[0.06]}/>
                <meshPhysicalMaterial color={`${state.selected === idx ? '#66a' : '#fff'}`} wireframe/>

                <mesh>
                    <sphereGeometry args={[0.7]}/>
                    <meshBasicMaterial visible={false}/>
                </mesh>

                { (state.hovered === idx && state.selected === -1) && <StellarSelectionEdge/>}
            </mesh>
        ))
    )
}

const StellarSelectionEdge = () => {
    const ref = useRef<EdgesRef | null>(null);

    useFrame(state => {
        if(ref.current) {
            const t = state.clock.getElapsedTime();

            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
            ref.current.rotation.z += 0.01;
        }
    });

    return (
        <Edges ref={ref} scale={12} color='#1c1c1c' threshold={5}/>
    )
}