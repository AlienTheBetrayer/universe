import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { Mesh } from "three"

export const StellarCanvas = () => {
    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(e.key == 'Control' && meshRef.current) {
                gsap.timeline().to(meshRef.current.position, { x: 1, duration: 2, ease: 'sine.inOut' })
                .to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, ease: 'circ.out'})
                .to(meshRef.current.position, { x: 2, duration: 1, ease: 'back.inOut' })
                .to(meshRef.current.position, { x: 0, duration: 2, ease: 'circ.inOut' })
                .to(meshRef.current.scale, { x: 1, y: 1, z: 1, ease: 'power4.inOut'});
            }
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);

    return (
        <Canvas style={{ width: '100%', height: '100%'}}>
            <ambientLight/>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1]}/>
                <meshPhysicalMaterial color='#fff' wireframe/>
            </mesh>
            <OrbitControls/>
        </Canvas>
    )
}