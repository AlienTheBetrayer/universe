import { Button } from '../../../../ui/Button/components/Button';
import type { ForgeBlockData } from '../../../context/types/blocks';
import './ForgeBlock.css';

interface Props {
    block: ForgeBlockData;
    isSelected: boolean;
    onSelect?: (idx: number) => void;
}

export const ForgeBlock = ({ block, isSelected, onSelect }: Props) => {
    return (
        <Button
            className={`forge-block ${
                isSelected ? 'forge-block-selected' : ''
            }`}
            onClick={() => onSelect?.(block.idx)}
        >
            {block.type}
        </Button>
    );
};
