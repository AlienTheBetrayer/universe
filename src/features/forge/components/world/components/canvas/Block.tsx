import type { ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { Matrix3, Vector3 } from 'three';
import type { BlockData } from '../../../../context/types/world/block';

const getNextBlockPosition = (
    e: ThreeEvent<MouseEvent>,
    blockSize: number,
    pos: [number, number, number]
) => {
    const faceNormal = e.face?.normal.clone();
    if (!faceNormal) return;

    const worldNormal = faceNormal
        .applyNormalMatrix(new Matrix3().getNormalMatrix(e.object.matrixWorld))
        .multiplyScalar(blockSize);

    const newPos = new Vector3(...pos).add(worldNormal);

    return newPos;
};

interface BlockProps {
    data: BlockData;
    blockSize: number;

    // events
    onClick?: (block: BlockData) => void;
    onInteract?: (type: 'create' | 'delete', block: BlockData) => void;
    onHoverStart?: (block: BlockData) => void;
    onHoverEnd?: (block: BlockData) => void;
}

export const Block = ({
    data,
    blockSize,
    onInteract,
    onClick,
    onHoverStart,
    onHoverEnd,
}: BlockProps) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <mesh
            position={data.position}
            castShadow
            receiveShadow
            // events
            onClick={(e) => {
                e.stopPropagation();
                if (onInteract) {
                    const newPos = getNextBlockPosition(
                        e,
                        blockSize,
                        data.position
                    );

                    if (newPos) {
                        onInteract?.('create', {
                            ...data,
                            position: [newPos.x, newPos.y, newPos.z],
                        });
                    }
                }

                onClick?.(data);
            }}
            onContextMenu={(e) => {
                e.stopPropagation();
                if (onInteract) {
                    onInteract?.('delete', data);
                }
            }}
            onPointerEnter={(e) => {
                e.stopPropagation();
                setHovered(true);
                onHoverStart?.(data);
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                setHovered(false);
                onHoverEnd?.(data);
            }}
        >
            <boxGeometry args={[blockSize, blockSize, blockSize]} />
            <meshPhysicalMaterial
                color={'#fff'}
                opacity={hovered ? 1 : 0.5}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
};
