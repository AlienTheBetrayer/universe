import { Edges, Instances } from '@react-three/drei';
import React, { useState } from 'react';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

interface Props {
    buildingEnabled: boolean;
}

export const WorldBlocks = ({ buildingEnabled }: Props) => {
    const [state, dispatch] = useWorldContext();
    const [hoveredIdx, setHoveredIdx] = useState<number | false>(false);

    return (
        <Instances limit={1000} frustumCulled={false}>
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />
            <meshPhysicalMaterial metalness={0.5} roughness={0.5} />
            {[...state.blocks.entries()].map(([_key, value], idx) => (
                <React.Fragment key={idx}>
                    {hoveredIdx === idx && (
                        <Edges
                            color='#94a1cc'
                            position={value.position}
                            scale={1.1}
                        />
                    )}

                    <Block
                        data={value}
                        blockSize={state.blockSize}
                        onHoverStart={() => setHoveredIdx(idx)}
                        onHoverEnd={() => setHoveredIdx(false)}
                        onInteract={(type, block) => {
                            if (!buildingEnabled) return;

                            switch (type) {
                                case 'create':
                                    dispatch({
                                        type: 'CREATE_BLOCK',
                                        data: { ...block, color: '#00f' },
                                    });
                                    break;
                                case 'delete':
                                    dispatch({
                                        type: 'DELETE_BLOCK',
                                        position: value.position,
                                    });
                                    break;
                            }
                        }}
                    />
                </React.Fragment>
            ))}
        </Instances>
    );
};
