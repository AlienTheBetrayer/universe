import { useRef } from 'react';
import { BlockDataMaterials } from '../../../../context/types/world/block';
import { useWorldContext } from '../../../../context/WorldContext';
import { ForgeUIOverlayBlock } from './ForgeUIOverlayBlock';
import './ForgeUIOverlayBlocks.css';

export const ForgeUIOverlayBlocks = () => {
    const [state, dispatch] = useWorldContext();
    const hoveredIdx = useRef<number | false>(false);

    return (
        <div className='forge-ui-overlay-blocks'>
            {Object.values(BlockDataMaterials).map(
                (block, idx) =>
                    block.isBuildable && (
                        <ForgeUIOverlayBlock
                            idx={idx}
                            isSelected={state.currentBlockMaterial === block}
                            key={idx}
                            block={block}
                            onSelect={(block) =>
                                dispatch({
                                    type: 'SELECT_BUILDING_BLOCK',
                                    block: block,
                                })
                            }
                            hoveredIdx={hoveredIdx}
                            onHoverStart={() => (hoveredIdx.current = idx)}
                            onHoverEnd={() => (hoveredIdx.current = false)}
                        />
                    )
            )}
        </div>
    );
};
