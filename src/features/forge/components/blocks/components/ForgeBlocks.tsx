import { useRef, type CSSProperties } from 'react';
import { useWorldContext } from '../../../context/WorldContext';
import {
    BlockDataMaterials,
    type BlockDataMaterial,
} from '../../../context/types/world/block';
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
                {Object.entries(BlockDataMaterials).map(
                    ([key, block], idx) =>
                        block.isBuildable && (
                            <ForgeBlock
                                key={idx}
                                idx={idx}
                                material={key as BlockDataMaterial}
                                hoveredIdx={hoveredIdx}
                                onHoverStart={() => (hoveredIdx.current = idx)}
                                onHoverEnd={() => (hoveredIdx.current = false)}
                                isSelected={state.currentBlockMaterial === key}
                                onSelect={() => {
                                    if (state.currentBlockMaterial !== key) {
                                        dispatch({
                                            type: 'SELECT_BUILDING_BLOCK',
                                            block: key as BlockDataMaterial,
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
