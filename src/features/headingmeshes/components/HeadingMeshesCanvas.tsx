import { Canvas } from "@react-three/fiber"

export const HeadingMeshesCanvas = () => {
    return (
        <Canvas style={{ width: '100%', height: '100%'}}>
            <mesh>
                <sphereGeometry args={[3]}/>
                <meshPhysicalMaterial/>
            </mesh>
        </Canvas>
    )
}