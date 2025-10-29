export const BlockDataMaterials = {
    Field: {
        isBuildable: false,
        visibleName: 'Field',
        jsx: <meshPhongMaterial shininess={1000} />,
    },
    Technical: {
        visibleName: '🌀 Technical',
        isBuildable: true,
        jsx: <meshNormalMaterial />,
    },
    Metal: {
        visibleName: '⚙️ Metal',
        isBuildable: true,
        jsx: <meshPhysicalMaterial metalness={0.9} roughness={0.5} />,
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
    Glitchy: {
        visibleName: '🔮 Glitchy',
        isBuildable: true,
        jsx: (
            <meshPhongMaterial
                depthTest={false}
                specular='#fff'
                reflectivity={1}
            />
        ),
    },
    Deep: {
        visibleName: '🕳️ Deep',
        isBuildable: true,
        jsx: <meshDepthMaterial />,
    },
};

export type BlockDataMaterial = keyof typeof BlockDataMaterials;

export interface BlockData {
    position: [number, number, number];
    color: string;
    material: BlockDataMaterial;
}

