import { Instance } from '@react-three/drei';
import { type ThreeEvent } from '@react-three/fiber';
import React, { useCallback } from 'react';
import { Matrix3, Vector3 } from 'three';
import type { BlockData } from '../../../../context/types/world/block';

interface BlockProps {
    data: BlockData;
    blockSize: number;

    // events
    onClick?: (block: BlockData) => void;
    onInteract?: (type: 'create' | 'delete', block: BlockData) => void;
    onPointerDown?: (block: BlockData) => void;
    onPointerUp?: (block: BlockData) => void;
    onHoverStart?: (block: BlockData) => void;
    onHoverEnd?: (block: BlockData) => void;
}

export const Block = React.memo(
    ({
        data,
        blockSize,
        onInteract,
        onClick,
        onPointerDown,
        onPointerUp,
        onHoverStart,
        onHoverEnd,
    }: BlockProps) => {
        // helper functions
        const getNextBlockPosition = useCallback(
            (e: ThreeEvent<MouseEvent>, pos: [number, number, number]) => {
                const faceNormal = e.face?.normal.clone();
                if (!faceNormal) return;

                const worldNormal = faceNormal
                    .applyNormalMatrix(
                        new Matrix3().getNormalMatrix(e.object.matrixWorld)
                    )
                    .multiplyScalar(blockSize);

                const newPos = new Vector3(...pos).add(worldNormal);

                return newPos;
            },
            [blockSize]
        );

        return (
            <Instance
                position={data.position}
                castShadow
                receiveShadow
                color={data.color}
                // events
                onClick={(e) => {
                    e.stopPropagation();
                    if (onInteract) {
                        const newPos = getNextBlockPosition(e, data.position);

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
                    onHoverStart?.(data);
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    onHoverEnd?.(data);
                }}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    onPointerDown?.(data);
                }}
                onPointerUp={(e) => {
                    e.stopPropagation();
                    onPointerUp?.(data);
                }}
            />
        );
    }
);
