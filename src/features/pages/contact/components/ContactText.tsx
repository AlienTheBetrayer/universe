import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react"
import { Mesh, MeshPhongMaterial } from "three"

export const ContactText = () => {
    const ref = useRef<Mesh>(null);

    useLayoutEffect(() => {
        if(ref.current) {
            ref.current.geometry.center();
            ref.current.position.y = 1;
            
        }
    }, [ref]);

    useFrame(state => {
        const t = state.clock.getElapsedTime();
        if(ref.current) {
            // color shift
            const material = ref.current.material as MeshPhongMaterial;
            const progress = Math.abs(Math.sin(t / 4));
            material.color.r = (1 - progress) * 3
            material.color.g = 0;
            material.color.b = progress * 3;

            ref.current.rotation.x = Math.sin(t) / 10;
            ref.current.rotation.y = Math.sin(t) / 10;
        }
    });
    
    return (
        <Text3D font='/fonts/inter-typeface.json'
        size={1} curveSegments={10}  height={1} bevelEnabled
        ref={ref}>
            CONTACT
            <meshPhongMaterial shininess={10} specular='#fff'/>
        </Text3D>
    )
}