import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';
import { useStellarContext } from '../context/StellarContext';
import { useStellarCamera } from '../hooks/useStellarCamera';
import { useStellarHotkeys } from '../hooks/useStellarHotkeys';

export const Stellars = React.memo(() => {
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
    useEffect(() => {
        state.stellars.forEach((stellar) => {
            dispatch({ type: 'STELLAR_MOVE_RANDOM', idx: stellar.idx });
        });
    }, [state.viewport]);

    // onclick camera focus handling
    useStellarCamera(three.camera);

    // hotkeys handling
    useStellarHotkeys();

    const hasUpdated = useRef<number | false>(false);

    // refs of [stellar_id: mesh]
    const stellarRefs = useRef<Mesh[]>([]);
    const groupRefs = useRef<Group[]>([]);

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

            const newPos = {
                x: (pointer.x * three.viewport.width) / 2,
                y: (pointer.y * three.viewport.height) / 2,
            };

            const actualPos = groupRefs.current[state.movingIdx].position;

            const dx = newPos.x - actualPos.x;
            const dy = newPos.y - actualPos.y;
            const m = Math.sqrt(dx * dx + dy * dy);
            const ux = dx / m;
            const uy = dy / m;
            const force = m / 8;

            actualPos.x += ux * force;
            actualPos.y += uy * force;

            hasUpdated.current = state.movingIdx;
        }

        // moving all orbs
        if (state.movingIdx === false) {
            // syncing positions into the state upon movement finish
            if (hasUpdated.current !== false) {
                const actualPos =
                    groupRefs.current[hasUpdated.current].position;
                dispatch({
                    type: 'STELLAR_MOVE',
                    idx: hasUpdated.current,
                    x: actualPos.x,
                    y: actualPos.y,
                });
                hasUpdated.current = false;
            }

            // moving positions if they change (regenerate / start-up animation)
            for (let i = 0; i < groupRefs.current.length; ++i) {
                const stellar = state.stellars.find((s) => s.idx === i);
                if (!groupRefs.current[i] || !stellar) continue;

                const actualPos = groupRefs.current[i].position;
                const statePos = {
                    x: stellar.x,
                    y: stellar.y,
                };

                const dx = statePos.x - actualPos.x;
                const dy = statePos.y - actualPos.y;
                const m = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / m;
                const uy = dy / m;
                let force = m / 48;

                if (m > 0.03) {
                    actualPos.x += ux * force;
                    actualPos.y += uy * force;
                } else {
                    actualPos.x = statePos.x;
                    actualPos.y = statePos.y;
                }
            }
        }
    });

    return state.stellars.map((stellar) => (
        <group
            ref={(el) => {
                groupRefs.current[stellar.idx] = el!;
            }}
            key={stellar.idx}
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
});
