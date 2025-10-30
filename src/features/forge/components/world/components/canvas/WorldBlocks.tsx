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

    useFrame((s) => {
        if (selection.ref.current) {
            const t = s.clock.getElapsedTime();

            const force = state.currentInteractionMode === 'building' ? 1 : 1.5;
            const scale = 1 + Math.abs(Math.sin(t * 2 * force)) / 3;
            selection.ref.current.scale.set(scale, scale, scale);
        }
    });

    return Array.from(state.blocks.entries()).map(([material, blockData]) => (
        <Instances frustumCulled={false} limit={100000} key={material}>
            {BlockDataMaterials[material].jsx}
            <boxGeometry
                args={[state.blockSize, state.blockSize, state.blockSize]}
            />

            <Edges
                color={`${
                    state.currentInteractionMode === 'building'
                        ? 'hsla(226, 90%, 75%, 1.00)'
                        : 'hsla(0, 90%, 75%, 1.00)'
                }`}
                ref={selection.ref}
                scale={1.1}
            />

            {Array.from(blockData.entries()).map(
                ([_positionStr, block], idx) => (
                    <Block
                        key={idx}
                        data={block}
                        blockSize={state.blockSize}
                        onHoverStart={(e) => selection.start(e)}
                        onHoverEnd={() => selection.end()}
                        onClick={(b) => {
                            if (state.currentInteractionMode === 'deleting') {
                                dispatch({
                                    type: 'DELETE_BLOCK',
                                    data: b,
                                });
                            }
                        }}
                        onInteract={(interactionType, b) => {
                            if (
                                !buildingEnabled ||
                                state.currentInteractionMode !== 'building'
                            )
                                return;

                            switch (interactionType) {
                                case 'create':
                                    dispatch({
                                        type: 'CREATE_BLOCK',
                                        data: {
                                            ...b,
                                            material:
                                                state.currentBlockMaterial,
                                        },
                                    });

                                    break;
                                case 'delete':
                                    if (b.material !== 'Field') {
                                        dispatch({
                                            type: 'DELETE_BLOCK',
                                            data: b,
                                        });
                                    }
                                    break;
                            }
                            selection.start(b);
                        }}
                    />
                )
            )}
        </Instances>
    ));
};
