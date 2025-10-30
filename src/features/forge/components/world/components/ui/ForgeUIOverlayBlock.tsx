import React, { useEffect, useState } from 'react';
import { Button } from '../../../../../ui/Button/components/Button';
import {
    BlockDataMaterials,
    type BlockDataMaterial,
} from '../../../../context/types/world/block';
import { ForgeBlockCanvas } from '../../../blocks/components/canvas/ForgeBlockCanvas';
import './ForgeUIOverlayBlock.css';

import { AnimatePresence, motion } from 'motion/react';
import { HotkeyTooltip } from '../../../../../hotkeytooltip/components/HotkeyTooltip';

interface Props {
    idx: number;
    material: BlockDataMaterial;
    isSelected: boolean;
    isEnabled: boolean;
    hoveredIdx: React.RefObject<number | false>;

    // events
    onSelect?: (material: BlockDataMaterial) => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

export const ForgeUIOverlayBlock = ({
    hoveredIdx,
    onHoverStart,
    onHoverEnd,
    idx,
    material,
    isSelected,
    isEnabled,
    onSelect,
}: Props) => {
    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(() => {
        if (!isSelected) {
            setHovered(false);
            return;
        }

        setHovered(true);
        const timeout = setTimeout(() => setHovered(false), 1500);
        return () => clearTimeout(timeout);
    }, [isSelected]);

    return (
        <Button
            className={`forge-ui-overlay-block ${
                isSelected ? 'forge-ui-overlay-block-selected' : ''
            }`}
            onClick={() => onSelect?.(material)}
            onPointerEnter={() => {
                onHoverStart?.();
                setHovered(true);
            }}
            onPointerLeave={() => {
                onHoverEnd?.();
                setHovered(false);
            }}
            enabled={isEnabled}
        >
            {/* tooltip frm this element */}
            <AnimatePresence>
                {hovered && isEnabled && (
                    <motion.div
                        className='forge-ui-overlay-block-title'
                        style={{ x: '-50%' }}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '-150%', opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 16,
                        }}
                    >
                        {BlockDataMaterials[material].emoji}{' '}
                        {BlockDataMaterials[material].visibleName}
                    </motion.div>
                )}
            </AnimatePresence>

            <ForgeBlockCanvas
                material={material}
                idx={idx}
                hoveredIdx={hoveredIdx}
                speed={0.3}
            />
            <HotkeyTooltip
                className='forge-ui-overlay-number-tooltip'
                hotkeys={[`${idx}`]}
            />
        </Button>
    );
};
