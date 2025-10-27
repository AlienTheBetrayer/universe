import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ForgeGround } from './ForgeGround';
import { useWorldContext } from '../../../../context/WorldContext';

export const ForgeCanvas = () => {
    const [state, setState] = useWorldContext();

    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            shadows
            camera={{ position: [5, 5, 10], fov: 60 }}
        >
            <pointLight position={[0, 4.5, 1]} intensity={8} />
            <pointLight position={[1, 0.5, -1]} intensity={8} />

            <ForgeGround />
            <mesh position={[0, 1.5, 0]}>
                <icosahedronGeometry args={[2, 0]} />
                <meshPhysicalMaterial />
            </mesh>

            <OrbitControls autoRotateSpeed={state.autoRotationEnabled ? 0.25 : 0} autoRotate />
        </Canvas>
    );
};
