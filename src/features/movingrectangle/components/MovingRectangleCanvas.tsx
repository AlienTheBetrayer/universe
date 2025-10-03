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
            <Bounds fit clip observe margin={0.9}>
                <pointLight position={[0, 0, 12]} intensity={40}/>
                <MovingRectangle progress={progress}/>
            </Bounds>
        </Canvas>
    )
}