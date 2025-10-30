import { Center, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { useRef, useState } from 'react';
import { type DirectionalLight } from 'three';
import { useForgeContext } from '../../../../context/ForgeContext';
import {
    ForgeWorldEffects,
    type ForgeEffectData,
} from '../../../../context/types/forge/effects';
import { useWorldContext } from '../../../../context/WorldContext';
import { WorldBlocks } from './WorldBlocks';
import { WorldEffectComposer } from './WorldEffectComposer';

export const WorldCanvas = () => {
    const [state] = useWorldContext();
    const [forgeState] = useForgeContext();

    const zustandEffect = forgeState.effectSlots.find(
        (slot) => slot.card.type === 'zustand'
    );

    const selectedTimeoutRef = useRef<number>(null);
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            shadows
            camera={{ position: [5, 5, 10], fov: 60 }}
            onPointerDown={() => {
                setSelected(true);
                selectedTimeoutRef.current = setTimeout(
                    () => setSelected(false),
                    300
                );
            }}
            onPointerUp={() => {
                setSelected(false);
                if (selectedTimeoutRef.current !== null) {
                    clearTimeout(selectedTimeoutRef.current);
                    selectedTimeoutRef.current = null;
                }
            }}
        >
            {/* effects */}
            <EffectComposer multisampling={0}>
                {WorldEffectComposer()}
            </EffectComposer>

            <WorldDirectionalLight zustandEffect={zustandEffect} />
            {!zustandEffect?.enabled && (
                <hemisphereLight color='#fff' intensity={0.6} />
            )}

            {/* blocks / data */}
            <Center key={`${state.blockSize}`}>
                <WorldBlocks buildingEnabled={selected} />
            </Center>

            {/* camera / controls */}
            <OrbitControls
                autoRotateSpeed={state.autoRotationEnabled ? 0.25 : 0}
                autoRotate
                dampingFactor={0.05}
            />
        </Canvas>
    );
};

interface LightProps {
    zustandEffect: ForgeEffectData | undefined;
}

const WorldDirectionalLight = ({ zustandEffect }: LightProps) => {
    const directionalLightRef = useRef<DirectionalLight>(null);

    useFrame((state) => {
        if (directionalLightRef.current) {
            const t = state.clock.getElapsedTime();

            if (zustandEffect?.enabled) {
                const strength =
                    zustandEffect.strength ??
                    ForgeWorldEffects.zustand.strength.min;

                directionalLightRef.current.position.set(
                    5 * Math.sin(t * strength),
                    10 * Math.cos(t * strength),
                    5
                );
            } else {
                directionalLightRef.current.position.set(5, 10, 5);
            }
        }
    });

    return (
        <directionalLight
            ref={directionalLightRef}
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
        />
    );
};
