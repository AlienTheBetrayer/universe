import { Canvas } from '@react-three/fiber';
import React from 'react';
import type { BlockDataMaterial } from '../../../../context/types/world/block';
import { ForgeBlockMesh } from './ForgeBlockMesh';

interface Props {
    idx: number;
    hoveredIdx: React.RefObject<number | false>;
    block: BlockDataMaterial;
}

export const ForgeBlockCanvas = React.memo(({ idx, hoveredIdx, block }: Props) => {
    return (
        <Canvas style={{ width: '100%', height: '100%' }}>
            <pointLight position={[0, 0, 3]} />
            <ForgeBlockMesh block={block} idx={idx} hoveredIdx={hoveredIdx} />
        </Canvas>
    );
});
