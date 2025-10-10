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
    
    // viewport setting
    useEffect(() => {
        setState(prev => ({ ...prev, viewport: { width: three.viewport.width, height: three.viewport.height }}));
    }, []);

    // generating random xy
    const positions = useStellarPositions();

    useEffect(() => {
        positions.generate();
    }, [state.viewport]);

    // onclick camera focus handling
    useStellarCamera(three.camera);

    // hotkeys handling
    useStellarHotkeys();

    // refs of [stellar_id: mesh]
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

        // move the selected orb when it's moving mode
        if(state.moving !== false) {
            const pointer = three.pointer;
            const newX = pointer.x * three.viewport.width / 2;
            const newY = pointer.y * three.viewport.height / 2;

            if(state.stellars[state.moving].x !== newX || state.stellars[state.moving].y !== newY) {
                setState(prev => ({ ...prev, stellars: prev.stellars.map(stellar => 
                    stellar.idx === state.moving ? { ...stellar, x: newX, y: newY } : stellar
                )}));
            }
        }
    });

    return (
        state.stellars.map((stellar) => (
            <group
            key={stellar.idx} position={[stellar.x ?? 0, stellar.y ?? 0, 0]}
            onPointerOver={() => setState(prev => ({ ...prev, hovered: prev.hovered === stellar.idx ? false : stellar.idx }))}
            onPointerOut={() => setState(prev => ({ ...prev, hovered: false }))}>
                <mesh
                onClick={() => { 
                    if(state.selected !== false)
                        setState(prev => ({ ...prev, selected: false }));
                }} 
                ref={(el) => (stellarRefs.current[stellar.idx] = el!)}>
                    <sphereGeometry args={[0.06]}/>
                    <meshPhysicalMaterial color={`${state.selected === stellar.idx ? '#66a' : '#fff'}`} wireframe/>
                </mesh>

                <mesh
                onClick={() => {
                    if(state.isMoveWaiting === false) {
                        setState(prev => ({ ...prev, selected: prev.selected === stellar.idx ? false : stellar.idx }));
                    } else if(state.moving === false) {
                        requestAnimationFrame(() => setState(prev => ({ ...prev, moving: stellar.idx })));
                    }

                }}
                onPointerDown={(e) => { 
                    if(e.button === 1 && state.selected === false && state.isMoveWaiting === false) {
                        setState(prev => ({ ...prev, moving: prev.moving === stellar.idx ? false : stellar.idx, isMoveWaiting: !prev.isMoveWaiting }));
                    }
                    }}>
                    <sphereGeometry args={[0.2]}/>
                    <meshPhysicalMaterial visible={false}/>
                </mesh>
            </group>
        ))
    )
}