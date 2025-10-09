import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useStellarContext } from "../context/StellarContext";
import { useStellarPositions } from "../hooks/useStellarPositions";
import { useStellarCamera } from "../hooks/useStellarCamera";
import { useStellarHotkeys } from "../hooks/useStellarHotkeys";

export const Stellars = () => {
    const [state, setState] = useStellarContext();
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
        setState(prev => ({ ...prev, viewport: { width: three.viewport.width, height: three.viewport.height }}));
    }, []);

    const stellarRefs = useRef<Mesh[]>([]);

    useFrame(s => {
        // slight idle warping of the camera (particle effect)
        const t = s.clock.getElapsedTime();
        three.camera.rotation.x = Math.sin(t) / 300;
        three.camera.rotation.y = Math.sin(t) / 300;
        three.camera.rotation.z = Math.sin(t) / 300;

        // animating the currently selected orb
        if(state.selected !== false) { 
            stellarRefs.current[state.selected].rotation.x += 0.01;
            stellarRefs.current[state.selected].rotation.y += 0.01;
            stellarRefs.current[state.selected].rotation.z += 0.01;
        }
    });

    return (
        state.stellars.map((stellar, idx) => (
            <group
            key={idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]}
            onPointerOver={() => setState(prev => ({ ...prev, hovered: prev.hovered === idx ? false : idx }))}
            onPointerOut={() => setState(prev => ({ ...prev, hovered: false }))}>
                <mesh
                onClick={() => { 
                    if(state.selected !== false)
                        setState(prev => ({ ...prev, hovered: false }));
                }} 
                ref={(el) => (stellarRefs.current[idx] = el!)}>
                    <sphereGeometry args={[0.06]}/>
                    <meshPhysicalMaterial color={`${state.selected === idx ? '#66a' : '#fff'}`} wireframe/>
                </mesh>

                <mesh
                onClick={() => setState(prev => ({ ...prev, selected: prev.selected === idx ? false : idx }))}>
                    <sphereGeometry args={[0.2]}/>
                    <meshPhysicalMaterial visible={false}/>
                </mesh>
            </group>
        ))
    )
}