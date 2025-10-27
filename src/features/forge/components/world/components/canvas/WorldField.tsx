import { Edges, Instances } from '@react-three/drei';
import React, { useState } from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const WorldField = () => {
    const [state, dispatch] = useWorldContext();

    const [hoveredIdx, setHoveredIdx] = useState<number | false>(false);

    return (
        <Instances frustumCulled={false}>
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />
            <meshPhysicalMaterial
                transparent
                opacity={0.1}
                depthWrite={false}
            />
            {state.fieldBlocks.map((fBlock, idx) => (
                <React.Fragment key={idx}>
                    {hoveredIdx === idx && (
                        <Edges
                            position={fBlock.position}
                            color={`${
                                hoveredIdx === idx ? '#68749a' : '#3f4a6e'
                            }`}
                        />
                    )}
                    <Block
                        onHoverStart={() => setHoveredIdx(idx)}
                        onHoverEnd={() => setHoveredIdx(false)}
                        blockSize={state.blockSize}
                        data={fBlock}
                        onInteract={(type, block) => {
                            if (type === 'create')
                                dispatch({ type: 'CREATE_BLOCK', data: block });
                        }}
                    />
                </React.Fragment>
            ))}
        </Instances>
    );
};
