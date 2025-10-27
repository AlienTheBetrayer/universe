import { useState } from 'react';
import type { BlockType } from '../../../../context/types/world/block';

interface BlockProps {
    data: BlockType;
    onAdd?: (position: [number, number, number]) => void;
    onHover?: () => void;
}

export const Block = ({ data, onAdd }: BlockProps) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <mesh
            position={data.position}
            onClick={() => onAdd?.(data.position)}
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
