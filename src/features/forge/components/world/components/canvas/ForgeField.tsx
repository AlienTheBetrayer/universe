import { Center } from '@react-three/drei';
import { type BlockType } from '../../../../context/types/world/block';
import { Block } from './Block';

interface Props {
    fieldBlocks: BlockType[];
}

export const ForgeField = ({ fieldBlocks }: Props) => {
    return (
        <Center>
            {fieldBlocks.map((fBlock) => (
                <Block data={fBlock} />
            ))}
        </Center>
    );
};
