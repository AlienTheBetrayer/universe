import { useRef } from 'react';
import { BlockDataMaterials, type BlockDataMaterial } from '../../../../context/types/world/block';
import { useWorldContext } from '../../../../context/WorldContext';
import { ForgeUIOverlayBlock } from './ForgeUIOverlayBlock';
import './ForgeUIOverlayBlocks.css';

export const ForgeUIOverlayBlocks = () => {
    const [state, dispatch] = useWorldContext();
    const hoveredIdx = useRef<number | false>(false);

    return (
        <div className='forge-ui-overlay-blocks'>
            {Object.entries(BlockDataMaterials).map(
                ([key, block], idx) =>
                    block.isBuildable && (
                        <ForgeUIOverlayBlock
                            idx={idx}
                            isSelected={state.currentBlockMaterial === key}
                            key={idx}
                            material={key as BlockDataMaterial}
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
