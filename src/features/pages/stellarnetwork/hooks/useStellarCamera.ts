import gsap from "gsap";
import { useEffect } from "react"
import type { StellarContextData } from "../context/StellarContext";
import type { Camera } from "@react-three/fiber";

export const useStellarCamera = (data: StellarContextData, camera: Camera) => {
    useEffect(() => {
        const position = data.selected !== -1 ? [data.stellars[data.selected].x, data.stellars[data.selected].y, 0.12] : [0, 0, 5];
        gsap.to(camera.position, { x: position[0], y: position[1], z: position[2], duration: 2, ease: 'circ.inOut' })
    }, [data.selected]);
}