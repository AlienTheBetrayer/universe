import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { useStellarContext } from '../context/StellarContext';
import { useStellarCamera } from '../hooks/useStellarCamera';
import { useStellarHotkeys } from '../hooks/useStellarHotkeys';
import { useStellarPositions } from '../hooks/useStellarPositions';

export const Stellars = () => {
    const [state, dispatch] = useStellarContext();
    const three = useThree();

    // viewport setting
    useEffect(() => {
        dispatch({
            type: 'VIEWPORT_SET',
            width: three.viewport.width,
            height: three.viewport.height,
        });
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

    useFrame((s) => {
        // slight idle warping of the camera (particle effect)
        const t = s.clock.getElapsedTime();
        three.camera.rotation.x = Math.sin(t) / 300;
        three.camera.rotation.y = Math.sin(t) / 300;
        three.camera.rotation.z = Math.sin(t) / 300;

        // animating the currently selected orb
        if (state.selectedIdx !== false) {
            stellarRefs.current[state.selectedIdx].rotation.x += 0.01;
            stellarRefs.current[state.selectedIdx].rotation.y += 0.01;
            stellarRefs.current[state.selectedIdx].rotation.z += 0.01;
        }

        // move the selected orb when it's moving mode
        if (state.movingIdx !== false) {
            const pointer = three.pointer;
            const newX = (pointer.x * three.viewport.width) / 2;
            const newY = (pointer.y * three.viewport.height) / 2;

            if (
                state.stellars[state.movingIdx].x !== newX ||
                state.stellars[state.movingIdx].y !== newY
            ) {
                dispatch({ type: 'STELLAR_MOVE_CURRENT', x: newX, y: newY });
            }
        }
    });

    return state.stellars.map((stellar) => (
        <group
            key={stellar.idx}
            position={[stellar.x ?? 0, stellar.y ?? 0, 0]}
            onPointerOver={() =>
                dispatch({ type: 'STELLAR_HOVER', idx: stellar.idx })
            }
            onPointerOut={() => dispatch({ type: 'STELLAR_HOVER', idx: false })}
        >
            <mesh
                onClick={() => {
                    if (state.selectedIdx !== false)
                        dispatch({ type: 'STELLAR_FOCUS', idx: false });
                }}
                ref={(el) => (stellarRefs.current[stellar.idx] = el!)}
            >
                <sphereGeometry args={[0.06]} />
                <meshPhysicalMaterial
                    color={`${
                        state.selectedIdx === stellar.idx ? '#66a' : '#fff'
                    }`}
                    wireframe
                />
            </mesh>

            <mesh
                onClick={() => {
                    if (state.isMoveWaiting === false) {
                        dispatch({
                            type: 'STELLAR_SELECT_TOGGLE',
                            idx: stellar.idx,
                        });
                    } else if (state.movingIdx === false) {
                        requestAnimationFrame(() =>
                            dispatch({
                                type: 'STELLAR_SET_MOVING',
                                idx: stellar.idx,
                            })
                        );
                    }
                }}
                onPointerDown={(e) => {
                    if (
                        e.button === 1 &&
                        state.selectedIdx === false &&
                        state.isMoveWaiting === false
                    ) {
                        dispatch({
                            type: 'STELLAR_TOGGLE_MOVING',
                            idx: stellar.idx,
                        });
                        dispatch({ type: 'ISMOVEWAITING_TOGGLE' });
                    }
                }}
            >
                <sphereGeometry args={[0.2]} />
                <meshPhysicalMaterial visible={false} />
            </mesh>
        </group>
    ));
};
