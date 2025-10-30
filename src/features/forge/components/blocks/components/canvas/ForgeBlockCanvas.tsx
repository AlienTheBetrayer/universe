import { Canvas } from '@react-three/fiber';
import {
    Bloom,
    ChromaticAberration,
    EffectComposer,
    Glitch,
} from '@react-three/postprocessing';
import React from 'react';
import { type BlockDataMaterial } from '../../../../context/types/world/block';
import { ForgeBlockMesh } from './ForgeBlockMesh';

interface Props {
    idx: number;
    hoveredIdx: React.RefObject<number | false>;
    material: BlockDataMaterial;
    speed?: number;
}

export const ForgeBlockCanvas = React.memo(
    ({ idx, hoveredIdx, material, speed = 1 }: Props) => {
        const effectSelector = () => {
            const effects: React.JSX.Element[] = [];

            effects.push(<Bloom intensity={1}/>);
            if (material === 'Glitchy') {
                effects.push(<ChromaticAberration offset={[0.1, 0.1]} />);
            } else if (material === 'Deep') {
                effects.push(<Glitch />);
            }

            return <>{...effects}</>;
        };

        return (
            <Canvas style={{ width: '100%', height: '100%' }}>
                <EffectComposer>{effectSelector()}</EffectComposer>
                <pointLight position={[0, 1, 3]} color='#fff' intensity={8} />
                <ForgeBlockMesh
                    material={material}
                    idx={idx}
                    hoveredIdx={hoveredIdx}
                    speed={speed}
                />
            </Canvas>
        );
    }
);
