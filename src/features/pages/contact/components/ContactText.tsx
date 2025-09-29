import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Mesh, MeshPhongMaterial } from "three"
import { useViewport } from "../../../../hooks/useViewport";

export const ContactText = () => {
    const ref = useRef<Mesh>(null);
    const viewport = useViewport();

    useFrame(state => {
        const t = state.clock.getElapsedTime();
        if(ref.current) {
            // color shift
            const material = ref.current.material as MeshPhongMaterial;
            const progress = Math.abs(Math.sin(t / 4));
            
            material.color.r = (1 - progress) * 3;
            material.color.g = 0;
            material.color.b = progress * 3;

            // rotation
            ref.current.rotation.x = Math.cos(t) / 30;
            ref.current.rotation.y = -Math.sin(t) / 30;
        }
    });
    
    return (
        <Center position={[0, viewport.innerWidth > 640 ? 1.5 : 2, 0]}>
            <Text3D font='/fonts/inter-typeface.json' size={ viewport.innerWidth / 100 * 0.09 } curveSegments={1}  height={viewport.innerWidth > 640 ? 1 : 0.3} bevelEnabled ref={ref}>
                CONTACT
                
                <meshPhongMaterial shininess={16} specular='#fff'/>
            </Text3D>
        </Center>
    )
}