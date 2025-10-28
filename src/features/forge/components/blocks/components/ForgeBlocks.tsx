import type { CSSProperties } from 'react';
import { useWorldContext } from '../../../context/WorldContext';
import { BlockDataMaterials } from '../../../context/types/world/block';
import { ForgeBlock } from './ForgeBlock';
import './ForgeBlocks.css';

interface Props {
    style?: CSSProperties;
}

export const ForgeBlocks = ({ style }: Props) => {
    const [state, dispatch] = useWorldContext();

    return (
        <div className='forge-blocks-container'>
            <h3>
                Building <mark>blocks</mark>
            </h3>
            <div className='forge-blocks' style={{ ...style }}>
                {Object.values(BlockDataMaterials).map((block, idx) => (
                    <ForgeBlock
                        key={idx}
                        block={block}
                        isSelected={state.currentBlockMaterial === block}
                        onSelect={() => {
                            if (state.currentBlockMaterial !== block) {
                                dispatch({
                                    type: 'SELECT_BUILDING_BLOCK',
                                    block: block,
                                });
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
