import { useRef, type CSSProperties } from 'react';
import { useWorldContext } from '../../../context/WorldContext';
import { BlockDataMaterials } from '../../../context/types/world/block';
import { ForgeBlock } from './ForgeBlock';
import './ForgeBlocks.css';

interface Props {
    containerStyle?: CSSProperties;
    style?: CSSProperties;
}

export const ForgeBlocks = ({ containerStyle, style }: Props) => {
    const [state, dispatch] = useWorldContext();
    const hoveredIdx = useRef<number | false>(false);

    return (
        <div className='forge-blocks-container' style={{ ...containerStyle }}>
            <h3>
                Building <mark>blocks</mark>
            </h3>
            <div className='forge-blocks' style={{ ...style }}>
                {Object.values(BlockDataMaterials).map(
                    (block, idx) =>
                        block.isBuildable && (
                            <ForgeBlock
                                key={idx}
                                idx={idx}
                                block={block}
                                hoveredIdx={hoveredIdx}
                                onHoverStart={() => hoveredIdx.current = idx}
                                onHoverEnd={() => hoveredIdx.current = false}
                                isSelected={
                                    state.currentBlockMaterial === block
                                }
                                onSelect={() => {
                                    if (state.currentBlockMaterial !== block) {
                                        dispatch({
                                            type: 'SELECT_BUILDING_BLOCK',
                                            block: block,
                                        });
                                    }
                                }}
                            />
                        )
                )}
            </div>
        </div>
    );
};
