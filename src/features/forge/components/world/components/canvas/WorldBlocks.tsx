import { Edges, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BlockDataMaterials } from '../../../../context/types/world/block';
import { useWorldContext } from '../../../../context/WorldContext';
import { useBlockSelection } from '../../hooks/useBlockSelection';
import { Block } from './Block';

interface Props {
    buildingEnabled: boolean;
}

export const WorldBlocks = ({ buildingEnabled }: Props) => {
    const [state, dispatch] = useWorldContext();
    const selection = useBlockSelection();

    useFrame((state) => {
        if (selection.ref.current) {
            const t = state.clock.getElapsedTime();

            const scale = 1 + Math.abs(Math.sin(t * 2)) / 3;
            selection.ref.current.scale.set(scale, scale, scale);
        }
    });

    return Array.from(state.blocks.entries()).map(([material, blockData]) => (
        <Instances frustumCulled={false} limit={100000} key={material}>
            {BlockDataMaterials[material].jsx}
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />

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
                                            material:
                                                state.currentBlockMaterial,
                                        },
                                    });
                                    break;
                                case 'delete':
                                    if (block.material !== 'Field') {
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
