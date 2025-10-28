import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { WorldBlocks } from './WorldBlocks';

export const WorldCanvas = () => {
    const [state] = useWorldContext();

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
