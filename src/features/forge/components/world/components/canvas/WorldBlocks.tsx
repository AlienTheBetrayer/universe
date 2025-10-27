import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const WorldBlocks = () => {
    const [state, dispatch] = useWorldContext();

    return state.blocks.map((block, idx) => (
        <Block
            blockSize={state.blockSize}
            data={block}
            key={idx}
            onInteract={(type, block) => {
                if (type === 'create')
                    dispatch({ type: 'CREATE_BLOCK', data: block });
            }}
        />
    ));
};
