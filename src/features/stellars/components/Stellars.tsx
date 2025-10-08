import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";
import { useStellarCamera } from "../hooks/useStellarCamera";
import { useStellarHotkeys } from "../hooks/useStellarHotkeys";

export const Stellars = () => {
    const [state, dispatch] = useStellarContext();
    const three = useThree();
    
    // generating random xy
    const positions = useStellarPositions();

    // onclick camera focus handling
    useStellarCamera(three.camera);

    // hotkeys handling
    useStellarHotkeys();

    // position setting / animating + state changing
    useEffect(() => {
        positions.generate();
    }, [state.viewport]);

    useEffect(() => {
        dispatch({ type: 'set_viewport', viewport: { width: three.viewport.width, height: three.viewport.height } });
    }, []);

    // rotating the currently selected stellar
    const stellarRefs = useRef<Mesh[]>([]);

    useFrame(s => {
        const t = s.clock.getElapsedTime();
        three.camera.rotation.x = Math.sin(t) / 300;
        three.camera.rotation.y = Math.sin(t) / 300;
        three.camera.rotation.z = Math.sin(t) / 300;

        if(state.selected !== -1) { // something is selected
            stellarRefs.current[state.selected].rotation.x += 0.01;
            stellarRefs.current[state.selected].rotation.y += 0.01;
            stellarRefs.current[state.selected].rotation.z += 0.01;
        }
    });

    return (
        state.stellars.map((stellar, idx) => (
            <group
            key={idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]}
            onPointerOver={() => dispatch({ type: 'hover', idx: idx })}
            onPointerOut={() => dispatch({ type: 'unhover' })}
            >
                <mesh
                onClick={() => { if(state.selected !== -1) dispatch({ type: 'select', idx: idx })} } 
                ref={(el) => (stellarRefs.current[idx] = el!)}>
                    <sphereGeometry args={[0.06]}/>
                    <meshPhysicalMaterial color={`${state.selected === idx ? '#66a' : '#fff'}`} wireframe/>
                </mesh>

                <mesh
                onClick={() => dispatch({ type: 'select', idx: idx })}>
                    <sphereGeometry args={[0.2]}/>
                    <meshPhysicalMaterial visible={false}/>
                </mesh>
            </group>
        ))
    )
}