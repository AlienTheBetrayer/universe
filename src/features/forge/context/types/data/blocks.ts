export type ForgeBlockType =
| 'Glass' | 'Dirt' | 'Stone' | 'Brick'

export interface ForgeBlockData {
    idx: number;
    type: ForgeBlockType;
}