import { Edges, Instances } from '@react-three/drei';
import React from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const WorldField = () => {
    const [state, dispatch] = useWorldContext();

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
                    <Edges position={fBlock.position} color='#3f4a6e' />
                    <Block
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
