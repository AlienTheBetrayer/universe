import { Edges, Instances } from '@react-three/drei';
import React, { useState } from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const WorldBlocks = () => {
    const [state, dispatch] = useWorldContext();
    const [hoveredIdx, setHoveredIdx] = useState<number | false>(false);

    return (
        <Instances limit={1000} frustumCulled={false}>
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />
            <meshPhysicalMaterial metalness={0.5} roughness={0.5} />
            {state.blocks.map((block, idx) => (
                <React.Fragment key={idx}>
                    {hoveredIdx === idx && (
                        <Edges position={block.position} color='#68749a' />
                    )}

                    <Block
                        data={block}
                        blockSize={state.blockSize}
                        onHoverStart={() => setHoveredIdx(idx)}
                        onHoverEnd={() => setHoveredIdx(false)}
                        onInteract={(type, block) => {
                            if (type === 'create')
                                dispatch({
                                    type: 'CREATE_BLOCK',
                                    data: { ...block, color: '#00f' },
                                });
                        }}
                    />
                </React.Fragment>
            ))}
        </Instances>
    );
};
