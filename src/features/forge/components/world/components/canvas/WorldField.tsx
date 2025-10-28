import { Edges, Instances } from '@react-three/drei';
import { useWorldContext } from '../../../../context/WorldContext';
import { useBlockSelection } from '../../hooks/useBlockSelection';
import { Block } from './Block';

interface Props {
    buildingEnabled: boolean;
}

export const WorldField = ({ buildingEnabled }: Props) => {
    const [state, dispatch] = useWorldContext();
    const selection = useBlockSelection();

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

            <Edges color='#94a1cc' scale={1.1} ref={selection.ref} />

            {[...state.fieldBlocks.entries()].map(([_key, value], idx) => (
                <Block
                    key={idx}
                    onHoverStart={(e) => selection.start(e)}
                    onHoverEnd={() => selection.end()}
                    blockSize={state.blockSize}
                    data={value}
                    onInteract={(type, block) => {
                        if (!buildingEnabled) return;

                        if (type === 'create')
                            dispatch({ type: 'CREATE_BLOCK', data: block });

                        selection.start(block);
                    }}
                />
            ))}
        </Instances>
    );
};
