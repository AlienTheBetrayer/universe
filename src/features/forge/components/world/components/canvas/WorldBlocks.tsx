import { Edges, Instances } from '@react-three/drei';
import { useWorldContext } from '../../../../context/WorldContext';
import { useBlockSelection } from '../../hooks/useBlockSelection';
import { Block } from './Block';

interface Props {
    buildingEnabled: boolean;
}

export const WorldBlocks = ({ buildingEnabled }: Props) => {
    const [state, dispatch] = useWorldContext();
    const selection = useBlockSelection();

    return (
        <Instances frustumCulled={false} limit={100000}>
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />
            <meshPhysicalMaterial metalness={0.5} roughness={0.5} />

            <Edges color='#ccd5f3' ref={selection.ref} scale={1.1} />

            {[...state.blocks.entries()].map(([_key, value], idx) => (
                <Block
                    key={idx}
                    data={value}
                    blockSize={state.blockSize}
                    onHoverStart={(e) => selection.start(e)}
                    onHoverEnd={() => selection.end()}
                    onInteract={(type, block) => {
                        if (!buildingEnabled) return;

                        switch (type) {
                            case 'create':
                                dispatch({
                                    type: 'CREATE_BLOCK',
                                    data: {
                                        ...block,
                                        color: '#00f',
                                        material: state.currentBlockMaterial,
                                    },
                                });
                                break;
                            case 'delete':
                                dispatch({
                                    type: 'DELETE_BLOCK',
                                    position: value.position,
                                });
                                break;
                        }
                        selection.start(block);
                    }}
                />
            ))}
        </Instances>
    );
};
