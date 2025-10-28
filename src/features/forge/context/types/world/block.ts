export type BlockDataMaterial = 'field' | 'regular';

export interface BlockData {
    position: [number, number, number];
    color: string;
    material: BlockDataMaterial;
}