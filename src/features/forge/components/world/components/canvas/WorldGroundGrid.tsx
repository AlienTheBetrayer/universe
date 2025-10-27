import { Grid } from '@react-three/drei';

interface Props {
    gridSize: number;
}

export const WorldGroundGrid = ({ gridSize }: Props) => {
    return (
        <Grid
            cellSize={gridSize}
            cellThickness={0.5}
            cellColor={'#eef0ff'}
            sectionSize={gridSize * 6}
            sectionThickness={1}
            sectionColor={'#eef0ff'}
            fadeDistance={48}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
            args={[10, 10]}
        />
    );
};
