import { Canvas } from '@react-three/fiber';
import { Button } from '../../../../ui/Button/components/Button';
import type { BlockDataMaterial } from '../../../context/types/world/block';
import './ForgeBlock.css';
import { ForgeBlockCanvas } from './canvas/ForgeBlockCanvas';

interface Props {
    block: BlockDataMaterial;
    isSelected: boolean;
    onSelect?: (block: BlockDataMaterial) => void;
}

export const ForgeBlock = ({ block, isSelected, onSelect }: Props) => {
    return (
        <Button
            className={`forge-block ${
                isSelected ? 'forge-block-selected' : ''
            }`}
            onClick={() => onSelect?.(block)}
        >
            <div className='forge-block-title'>
                { block.visibleName}
            </div>

            <ForgeBlockCanvas block={block}/>
        </Button>
    );
};
