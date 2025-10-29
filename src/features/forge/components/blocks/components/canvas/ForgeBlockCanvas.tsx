import { Canvas } from '@react-three/fiber';
import React from 'react';
import { type BlockDataMaterial } from '../../../../context/types/world/block';
import { ForgeBlockMesh } from './ForgeBlockMesh';

interface Props {
    idx: number;
    hoveredIdx: React.RefObject<number | false>;
    material: BlockDataMaterial;
}

export const ForgeBlockCanvas = React.memo(
    ({ idx, hoveredIdx, material }: Props) => {
        return (
            <Canvas style={{ width: '100%', height: '100%' }}>
                {/* <hemisphereLight color='#fff' intensity={8} /> */}
                <pointLight position={[0, 1, 3]} color='#fff' intensity={8} />

                <ForgeBlockMesh
                    material={material}
                    idx={idx}
                    hoveredIdx={hoveredIdx}
                />
            </Canvas>
        );
    }
);
