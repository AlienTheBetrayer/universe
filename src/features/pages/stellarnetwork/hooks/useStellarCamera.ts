import gsap from "gsap";
import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";
import type { Camera } from "@react-three/fiber";

export const useStellarCamera = (camera: Camera) => {
    const [state, ] = useStellarContext();

    useEffect(() => {
        const position = state.selected !== -1 ? [state.stellars[state.selected].x, state.stellars[state.selected].y, 0.12] : [0, 0, 5];
        gsap.to(camera.position, { x: position[0], y: position[1], z: position[2], duration: 2, ease: 'circ.inOut' })
    }, [state.selected]);
}