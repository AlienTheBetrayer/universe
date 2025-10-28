import type { JSX } from 'react';

export interface BlockDataMaterial {
    visibleName: string;
    isBuildable: boolean;
    jsx: JSX.Element;
}

export const BlockDataMaterials = {
    Field: {
        isBuildable: false,
        visibleName: '',
        jsx: (
            <meshPhysicalMaterial
                metalness={0.75}
                roughness={0}
                clearcoat={1}
                opacity={0.75}
                transparent
                depthWrite={false}
            />
        ),
    },
    Technical: {
        visibleName: '🌀 Technical',
        isBuildable: true,
        jsx: <meshNormalMaterial/>,
    },
    Metal: {
        visibleName: '⚙️ Metal',
        isBuildable: true,
        jsx: <meshPhysicalMaterial metalness={1} roughness={0.5} />,
    },
    Glass: {
        isBuildable: true,
        visibleName: '🪩 Glass',
        jsx: (
            <meshPhysicalMaterial
                metalness={0.5}
                roughness={0}
                clearcoat={1}
                opacity={0.5}
                transparent
                depthWrite={false}
            />
        ),
    },
    Crystal: {
        visibleName: '💎 Crystal',
        isBuildable: true,
        jsx: <meshPhongMaterial shininess={120} specular='#fff' />,
    },
};

export interface BlockData {
    position: [number, number, number];
    color: string;
    material: BlockDataMaterial;
}
