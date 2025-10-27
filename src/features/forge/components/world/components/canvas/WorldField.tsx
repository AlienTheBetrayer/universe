import { Instances } from '@react-three/drei';
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
                opacity={0.5}
                depthWrite={false}
            />
            {state.fieldBlocks.map((fBlock, idx) => (
                <Block
                    blockSize={state.blockSize}
                    key={idx}
                    data={fBlock}
                    onInteract={(type, block) => {
                        if (type === 'create')
                            dispatch({ type: 'CREATE_BLOCK', data: block });
                    }}
                />
            ))}
        </Instances>
    );
};
