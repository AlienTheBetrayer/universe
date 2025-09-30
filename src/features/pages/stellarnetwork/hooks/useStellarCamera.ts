import gsap from "gsap";
import { useRef } from "react"
import { useStellarContext } from "../context/StellarContext";
import { useFrame, type Camera } from "@react-three/fiber";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

export const useStellarCamera = (camera: Camera) => {
    const isMobile = useMediaQuery(768);
    const [state, ] = useStellarContext();
    const cameraTween = useRef<GSAPTween | null>(null);

    useFrame(() => {
        if(state.selected !== -1) {
            const target = state.stellars[state.selected];
            if(!target)
                return;

            cameraTween.current?.kill();

            cameraTween.current = gsap.to(camera.position, {
                x: target.x,
                y: target.y,
                z: isMobile ? 0.175 : 0.12, 
                duration: 2,
                ease: "circ.out",
            });
        } else {
            cameraTween.current?.kill();
            cameraTween.current = gsap.to(camera.position, {
                x: 0,
                y: 0,
                z: 5,
                duration: 2,
                ease: "circ.out",
            });
        }
    });
}