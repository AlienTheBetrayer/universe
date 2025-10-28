import { Button } from '../../../../ui/Button/components/Button';
import type { BlockDataMaterial } from '../../../context/types/world/block';
import './ForgeBlock.css';

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
            {block.type}
        </Button>
    );
};
