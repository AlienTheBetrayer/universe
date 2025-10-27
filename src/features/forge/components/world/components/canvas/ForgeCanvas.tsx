import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { ForgeGround } from './ForgeGround';

interface BlockProps {
    position: [number, number, number];
    onAdd?: (position: [number, number, number]) => void;
}
const Block = ({ position, onAdd }: BlockProps) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <mesh
            position={position}
            onClick={() => onAdd?.(position)}
            castShadow
            receiveShadow
            onPointerEnter={(e) => {
                e.stopPropagation();
                setHovered(true);
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                setHovered(false);
            }}
        >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshPhysicalMaterial
                color={'#fff'}
                opacity={hovered ? 1 : 0}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
};

const fillBlocks = () => {
    const newBlocks: [number, number, number][] = [];

    for (let z = 0; z < 50; ++z) {
        for (let x = 0; x < 50; ++x) {
            newBlocks.push([x * 0.5, -0.2, z * 0.5]);
        }
    }

    return newBlocks;
};

export const ForgeCanvas = () => {
    const [state] = useWorldContext();

    const [blocks, setBlocks] = useState<[number, number, number][]>([]);

    useEffect(() => {
        setBlocks(fillBlocks());
    }, []);

    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            shadows
            camera={{ position: [5, 5, 10], fov: 60 }}
        >
            <spotLight position={[0, 10, 0]} intensity={1280} />

            <ForgeGround />

            <Center>
                {blocks.map((block) => (
                    <Block position={[...block]} />
                ))}
            </Center>

            <OrbitControls
                autoRotateSpeed={state.autoRotationEnabled ? 0.25 : 0}
                autoRotate
            />
        </Canvas>
    );
};
