import { Edges, Instances } from '@react-three/drei';
import React, { useState } from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

interface Props {
    buildingEnabled: boolean;
}

export const WorldField = ({ buildingEnabled }: Props) => {
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
            {[...state.fieldBlocks.entries()].map(([_key, value], idx) => (
                <React.Fragment key={idx}>
                    {hoveredIdx === idx && (
                        <Edges
                            color='#94a1cc'
                            position={value.position}
                            scale={1.1}
                        />
                    )}

                    <Block
                        onHoverStart={() => setHoveredIdx(idx)}
                        onHoverEnd={() => setHoveredIdx(false)}
                        blockSize={state.blockSize}
                        data={value}
                        onInteract={(type, block) => {
                            if(!buildingEnabled)
                                return;
                            
                            if (type === 'create')
                                dispatch({ type: 'CREATE_BLOCK', data: block });
                        }}
                    />
                </React.Fragment>
            ))}
        </Instances>
    );
};
