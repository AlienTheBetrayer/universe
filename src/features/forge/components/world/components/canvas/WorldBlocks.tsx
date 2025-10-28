import { Edges, Instances } from '@react-three/drei';
import { useWorldContext } from '../../../../context/WorldContext';
import { useBlockSelection } from '../../hooks/useBlockSelection';
import { Block } from './Block';
import { useFrame } from '@react-three/fiber';

interface Props {
    buildingEnabled: boolean;
}

export const WorldBlocks = ({ buildingEnabled }: Props) => {
    const [state, dispatch] = useWorldContext();
    const selection = useBlockSelection();

    useFrame(state => {
        if(selection.ref.current) {
            const t = state.clock.getElapsedTime();

            const scale = 1 + Math.abs(Math.sin(t * 2)) / 3;
            selection.ref.current.scale.set(scale, scale, scale);
        }
    });

    return Array.from(state.blocks.entries()).map(([material, blockData]) => (
        <Instances frustumCulled={false} limit={100000} key={material.type}>
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />
            <meshPhysicalMaterial metalness={0.5} roughness={0.5} />

            <Edges color='#ccd5f3' ref={selection.ref} scale={1.1} />

            {Array.from(blockData.entries()).map(
                ([_positionStr, block], idx) => (
                    <Block
                        key={idx}
                        data={block}
                        blockSize={state.blockSize}
                        onHoverStart={(e) => selection.start(e)}
                        onHoverEnd={() => selection.end()}
                        onInteract={(interactionType, block) => {
                            if (!buildingEnabled) return;

                            switch (interactionType) {
                                case 'create':
                                    dispatch({
                                        type: 'CREATE_BLOCK',
                                        data: {
                                            ...block,
                                            color: '#00f',
                                            material:
                                                state.currentBlockMaterial,
                                        },
                                    });
                                    break;
                                case 'delete':
                                    if (!['Field'].includes(block.material.type)) {
                                        dispatch({
                                            type: 'DELETE_BLOCK',
                                            data: block,
                                        });
                                    }
                                    break;
                            }
                            selection.start(block);
                        }}
                    />
                )
            )}
        </Instances>
    ));
};
