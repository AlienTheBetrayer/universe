import React from 'react';
import { HotkeyTooltip } from '../../../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../../../ui/Button/components/Button';
import {
    BlockDataMaterials,
    type BlockDataMaterial,
} from '../../../context/types/world/block';
import './ForgeBlock.css';
import { ForgeBlockCanvas } from './canvas/ForgeBlockCanvas';

interface Props {
    idx: number;
    material: BlockDataMaterial;
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
    material,
    isSelected,
    onSelect,
}: Props) => {
    return (
        <Button
            className={`forge-block ${
                isSelected ? 'forge-block-selected' : ''
            }`}
            onClick={() => onSelect?.(material)}
            onPointerEnter={() => onHoverStart?.()}
            onPointerLeave={() => onHoverEnd?.()}
        >
            <div className='forge-block-title'>
                {BlockDataMaterials[material].emoji} {BlockDataMaterials[material].visibleName}
            </div>
            <div className='forge-block-emoji'>
                {BlockDataMaterials[material].emoji}
            </div>

            <ForgeBlockCanvas
                material={material}
                idx={idx}
                hoveredIdx={hoveredIdx}
            />
            <HotkeyTooltip
                className='forge-block-number-tooltip'
                hotkeys={[`${idx}`]}
            />
        </Button>
    );
};
