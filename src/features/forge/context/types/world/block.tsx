import type { JSX } from 'react';

export type BlockDataMaterialType =
    | 'Field'
    | 'Metal'
    | 'Rainbow'
    | 'Regular'
    | 'Bedrock';

export interface BlockDataMaterial {
    type: BlockDataMaterialType;
    isBuildable: boolean;
    jsx: JSX.Element;
}

export const BlockDataMaterials: {
    [K in BlockDataMaterialType]: BlockDataMaterial;
} = {
    Field: {
        type: 'Field',
        isBuildable: false,
        jsx: (
            <meshPhysicalMaterial
                metalness={0.5}
                roughness={0}
                clearcoat={1}
                opacity={0.75}
                transparent
                depthWrite={false}
            />
        ),
    },
    Bedrock: {
        type: 'Bedrock',
        isBuildable: true,
        jsx: <meshPhysicalMaterial metalness={0.5} roughness={0.5} />,
    },
    Metal: {
        type: 'Metal',
        isBuildable: true,
        jsx: <meshPhysicalMaterial metalness={0.5} roughness={0.5} />,
    },
    Rainbow: {
        type: 'Rainbow',
        isBuildable: true,
        jsx: <meshPhysicalMaterial metalness={0.5} roughness={0.5} />,
    },
    Regular: {
        type: 'Regular',
        isBuildable: true,
        jsx: <meshPhysicalMaterial metalness={0.5} roughness={0.5} />,
    },
};

export interface BlockData {
    position: [number, number, number];
    color: string;
    material: BlockDataMaterial;
}
