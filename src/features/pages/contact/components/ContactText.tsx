import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Mesh, MeshPhongMaterial } from "three"
import { useViewport } from "../../../../hooks/useViewport";
import { useContactContext } from "../context/ContactContext";

export const ContactText = () => {
    const [, setContactContextData] = useContactContext();
    const ref = useRef<Mesh>(null);
    const viewport = useViewport();

    useFrame(state => {
        const t = state.clock.getElapsedTime();
        if(ref.current) {
            // color shift
            const material = ref.current.material as MeshPhongMaterial;
            const progress = Math.abs(Math.sin(t / 4));
            
            const rgb = [(1 - progress) * 3, 0, progress * 3];
            material.color.r = rgb[0];
            material.color.g = rgb[1];
            material.color.b = rgb[2];

            setContactContextData(prev => ({...prev, color: rgb}));

            // rotation
            ref.current.rotation.x = Math.sin(t) / 10;
            ref.current.rotation.y = Math.sin(t) / 10;
            
        }
    });
    
    return (
        <Center position={[0, viewport.innerWidth > 640 ? 1 : 2, 0]}>
            <Text3D font='/fonts/inter-typeface.json' size={ viewport.innerWidth / 100 * 0.075 } curveSegments={10}  height={viewport.innerWidth > 640 ? 1 : 0.3} bevelEnabled ref={ref}>
                CONTACT
                <meshPhongMaterial shininess={10} specular='#fff'/>
            </Text3D>
        </Center>
    )
}