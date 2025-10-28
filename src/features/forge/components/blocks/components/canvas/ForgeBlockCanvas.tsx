import { Canvas } from '@react-three/fiber';
import type { BlockDataMaterial } from '../../../../context/types/world/block';
import { ForgeBlockMesh } from './ForgeBlockMesh';

interface Props {
    block: BlockDataMaterial;
}

export const ForgeBlockCanvas = ({ block }: Props) => {
    return (
        <Canvas style={{ width: '100%', height: '100%' }}>
            <pointLight position={[0, 0, 3]}/>
            <ForgeBlockMesh block={block}/>
        </Canvas>
    );
};
