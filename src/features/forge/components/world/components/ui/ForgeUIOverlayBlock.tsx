import React, { useState } from 'react';
import { Button } from '../../../../../ui/Button/components/Button';
import type { BlockDataMaterial } from '../../../../context/types/world/block';
import { ForgeBlockCanvas } from '../../../blocks/components/canvas/ForgeBlockCanvas';
import './ForgeUIOverlayBlock.css';

import { AnimatePresence, motion } from 'motion/react';

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

export const ForgeUIOverlayBlock = ({
    hoveredIdx,
    onHoverStart,
    onHoverEnd,
    idx,
    block,
    isSelected,
    onSelect,
}: Props) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <Button
            className={`forge-ui-overlay-block ${
                isSelected ? 'forge-ui-overlay-block-selected' : ''
            }`}
            onClick={() => onSelect?.(block)}
            onPointerEnter={() => {
                onHoverStart?.();
                setHovered(true);
            }}
            onPointerLeave={() => {
                onHoverEnd?.();
                setHovered(false);
            }}
        >
            {/* tooltip frm this element */}
            <AnimatePresence>
                {hovered && (
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
                        {block.visibleName}
                    </motion.div>
                )}
            </AnimatePresence>

            <ForgeBlockCanvas block={block} idx={idx} hoveredIdx={hoveredIdx} />
        </Button>
    );
};
