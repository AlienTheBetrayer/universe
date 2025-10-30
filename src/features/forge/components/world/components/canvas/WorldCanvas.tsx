import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
    Bloom,
    ChromaticAberration,
    EffectComposer,
    Glitch,
} from '@react-three/postprocessing';
import { useRef, useState, type JSX } from 'react';
import { Vector2 } from 'three';
import { useForgeContext } from '../../../../context/ForgeContext';
import { type ForgeCardType } from '../../../../context/types/forge/cards';
import { ForgeWorldEffects } from '../../../../context/types/forge/effects';
import { useWorldContext } from '../../../../context/WorldContext';
import { WorldBlocks } from './WorldBlocks';

export const WorldCanvas = () => {
    const [state] = useWorldContext();
    const [forgeState] = useForgeContext();

    const selectedTimeoutRef = useRef<number>(null);
    const [selected, setSelected] = useState<boolean>(false);

    const effectComposer = () => {
        const elements: JSX.Element[] = [];
        const occupiedSlots = new Map<
            ForgeCardType,
            { current: number | undefined; min: number }
        >();

        forgeState.effectSlots.forEach((slot) => {
            occupiedSlots.set(slot.card.type, {
                current: slot.strength,
                min: ForgeWorldEffects[slot.card.type].strength.min,
            });
        });

        if (occupiedSlots.has('css')) {
            const slot = occupiedSlots.get('css')!;
            elements.push(
                <ChromaticAberration
                    offset={[
                        (slot?.current ?? slot?.min) / 30,
                        (slot?.current ?? slot?.min) / 30,
                    ]}
                />
            );
        }

        if (occupiedSlots.has('html')) {
            elements.push(<Glitch duration={new Vector2(1, 1)} />);
        }

        return <>{...elements}</>;
    };

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
            <EffectComposer>
                <Bloom
                    intensity={2}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                />

                {effectComposer()}
            </EffectComposer>

            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />
            <hemisphereLight color='#fff' intensity={0.6} />

            <Center key={`${state.blockSize}`}>
                <WorldBlocks buildingEnabled={selected} />
            </Center>

            <OrbitControls
                autoRotateSpeed={state.autoRotationEnabled ? 0.25 : 0}
                autoRotate
                dampingFactor={0.05}
            />
        </Canvas>
    );
};
