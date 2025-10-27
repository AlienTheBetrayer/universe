import { Instances } from '@react-three/drei';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const WorldBlocks = () => {
    const [state, dispatch] = useWorldContext();

    return (
        <Instances limit={1000} frustumCulled={false}>
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />
            <meshPhysicalMaterial metalness={0.5} roughness={0.5}/>
            {state.blocks.map((block, idx) => (
                <Block
                    key={idx}
                    data={block}
                    blockSize={state.blockSize}
                    onInteract={(type, block) => {
                        if (type === 'create')
                            dispatch({ type: 'CREATE_BLOCK', data: { ...block, color: '#00f' } });
                    }}
                />
            ))}
        </Instances>
    );
};
