import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useWorldContext } from '../../../../context/WorldContext';
import { ForgeField } from './ForgeField';
import { ForgeGroundGrid } from './ForgeGroundGrid';

export const ForgeCanvas = () => {
    const [state] = useWorldContext();

    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            shadows
            camera={{ position: [5, 5, 10], fov: 60 }}
        >
            <spotLight position={[0, 10, 0]} intensity={1280} />

            <ForgeGroundGrid />
            <ForgeField/>

            <OrbitControls
                autoRotateSpeed={state.autoRotationEnabled ? 0.25 : 0}
                autoRotate
            />
        </Canvas>
    );
};
