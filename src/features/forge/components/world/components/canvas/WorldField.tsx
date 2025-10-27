import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const WorldField = () => {
    const [state, dispatch] = useWorldContext();

    return (
        <>
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
        </>
    );
};
