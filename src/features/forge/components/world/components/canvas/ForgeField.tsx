import { Center } from '@react-three/drei';
import { useWorldContext } from '../../../../context/WorldContext';
import { Block } from './Block';

export const ForgeField = () => {
    const [state, dispatch] = useWorldContext();

    return (
        <Center>
            {state.fieldBlocks.map((fBlock, idx) => (
                <Block key={idx} data={fBlock} />
            ))}
        </Center>
    );
};
