export const BlockDataMaterials = [
    'Field',
    'Metal',
    'Rainbow',
    'Regular',
    'Bedrock',
] as const;

export type BlockDataMaterial = (typeof BlockDataMaterials)[number];

export interface BlockData {
    position: [number, number, number];
    color: string;
    material: BlockDataMaterial;
}
