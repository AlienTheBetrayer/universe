export type BlockDataMaterialType =
    | 'Field'
    | 'Metal'
    | 'Rainbow'
    | 'Regular'
    | 'Bedrock';

export interface BlockDataMaterial {
    type: BlockDataMaterialType;
    isBuildable: boolean;
}

export const BlockDataMaterials: {
    [K in BlockDataMaterialType]: BlockDataMaterial;
} = {
    Field: {
        type: 'Field',
        isBuildable: false,
    },
    Bedrock: {
        type: 'Bedrock',
        isBuildable: true,
    },
    Metal: {
        type: 'Metal',
        isBuildable: true,
    },
    Rainbow: {
        type: 'Rainbow',
        isBuildable: true,
    },
    Regular: {
        type: 'Regular',
        isBuildable: true,
    },
};

export interface BlockData {
    position: [number, number, number];
    color: string;
    material: BlockDataMaterial;
}
