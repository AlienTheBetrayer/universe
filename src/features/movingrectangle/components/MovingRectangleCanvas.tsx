import { Canvas } from "@react-three/fiber"
import { MovingRectangle } from "./MovingRectangle"
import type { MotionValue } from "motion"

interface Props {
    progress: MotionValue<number>;
}

export const MovingRectangleCanvas = ({ progress }: Props) => {
    return (
        <Canvas>
            <pointLight position={[0, 0, 12]} intensity={40}/>
            <MovingRectangle progress={progress}/>
        </Canvas>
    )
}