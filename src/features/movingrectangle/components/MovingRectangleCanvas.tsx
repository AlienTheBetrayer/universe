import { Canvas } from "@react-three/fiber"
import { MovingRectangle } from "./MovingRectangle"
import type { MotionValue } from "motion"
import { Bounds } from "@react-three/drei";

interface Props {
    progress: MotionValue<number>;
}

export const MovingRectangleCanvas = ({ progress }: Props) => {
    return (
        <Canvas>
            <Bounds fit clip observe margin={0.7}>
                <pointLight position={[-12, 5, 3]} intensity={40}/>
                <pointLight position={[12, 3, 6]} intensity={40}/>
                <MovingRectangle progress={progress}/>
            </Bounds>
        </Canvas>
    )
}