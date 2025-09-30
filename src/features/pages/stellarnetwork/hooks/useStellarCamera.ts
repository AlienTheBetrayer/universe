import gsap from "gsap";
import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";
import { type Camera } from "@react-three/fiber";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

export const useStellarCamera = (camera: Camera) => {
    const [state, ] = useStellarContext();
    const isMobile = useMediaQuery(768);

    useEffect(() => {
        const position = state.selected !== -1 ? [state.stellars[state.selected].x, state.stellars[state.selected].y, isMobile ? 0.175 : 0.12] : [0, 0, 5];
        gsap.to(camera.position, { x: position[0], y: position[1], z: position[2], duration: 2, ease: 'circ.inOut' })
    }, [state.selected]);
}
