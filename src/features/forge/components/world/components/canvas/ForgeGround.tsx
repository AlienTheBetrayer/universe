import { Grid } from '@react-three/drei';

export const ForgeGround = () => {
    return (
        <Grid
            cellSize={0.5}
            cellThickness={0.5}
            cellColor={'#6f6f6f'}
            sectionSize={3}
            sectionThickness={1}
            sectionColor={'#4b5e9d'}
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
            args={[10, 10]}
        />
    );
};
