import React from 'react';
import { HotkeyTooltip } from '../../../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../../../ui/Button/components/Button';
import type { BlockDataMaterial } from '../../../context/types/world/block';
import './ForgeBlock.css';
import { ForgeBlockCanvas } from './canvas/ForgeBlockCanvas';

interface Props {
    idx: number;
    block: BlockDataMaterial;
    isSelected: boolean;
    hoveredIdx: React.RefObject<number | false>;

    // events
    onSelect?: (block: BlockDataMaterial) => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

export const ForgeBlock = ({
    hoveredIdx,
    onHoverStart,
    onHoverEnd,
    idx,
    block,
    isSelected,
    onSelect,
}: Props) => {
    return (
        <Button
            className={`forge-block ${
                isSelected ? 'forge-block-selected' : ''
            }`}
            onClick={() => onSelect?.(block)}
            onPointerEnter={() => onHoverStart?.()}
            onPointerLeave={() => onHoverEnd?.()}
        >
            <div className='forge-block-title'>{block.visibleName}</div>

            <ForgeBlockCanvas block={block} idx={idx} hoveredIdx={hoveredIdx} />
            <HotkeyTooltip
                className='forge-block-number-tooltip'
                hotkeys={[`${idx}`]}
            />
        </Button>
    );
};
