import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useWorldContext } from '../../../../context/WorldContext';
import { WorldBlocks } from './WorldBlocks';
import { WorldField } from './WorldField';
import { WorldGroundGrid } from './WorldGroundGrid';

export const WorldCanvas = () => {
    const [state] = useWorldContext();

    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            shadows
            camera={{ position: [5, 5, 10], fov: 60 }}
        >
            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />
            <hemisphereLight
                color='#fff'
                intensity={0.6}
            />

            <WorldGroundGrid gridSize={state.blockSize} />
            <Center>
                <WorldField />
                <WorldBlocks />
            </Center>

            <OrbitControls
                autoRotateSpeed={state.autoRotationEnabled ? 0.25 : 0}
                autoRotate
            />
        </Canvas>
    );
};
