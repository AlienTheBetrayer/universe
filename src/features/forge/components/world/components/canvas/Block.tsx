import { useState } from 'react';
import { Matrix3, Vector3 } from 'three';
import type { BlockData } from '../../../../context/types/world/block';

interface BlockProps {
    data: BlockData;

    // events
    onClick?: (block: BlockData) => void;
    onInteract?: (block: BlockData) => void;
    onHoverStart?: (block: BlockData) => void;
    onHoverEnd?: (block: BlockData) => void;
}

export const Block = ({
    data,
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
                    const faceNormal = e.face?.normal.clone();
                    if (!faceNormal) return;

                    const worldNormal = faceNormal.applyNormalMatrix(
                        new Matrix3().getNormalMatrix(e.object.matrixWorld)
                    );

                    const newPos = new Vector3(...data.position).add(
                        worldNormal
                    );

                    onInteract?.({
                        ...data,
                        position: [newPos.x, newPos.y, newPos.z],
                    });
                }

                onClick?.(data);
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
