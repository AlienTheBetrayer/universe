import { type Camera } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useStellarContext } from '../context/StellarContext';

export const useStellarCamera = (camera: Camera) => {
    const [state] = useStellarContext();
    const isMobile = useMediaQuery(768);

    useEffect(() => {
        const stellar = state.stellars.find(
            (s) => s.idx === state.selectedIdx
        )!;
        const position =
            state.selectedIdx !== false
                ? [stellar.x, stellar.y, isMobile ? 0.175 : 0.12]
                : [0, 0, 5];
        gsap.to(camera.position, {
            x: position[0],
            y: position[1],
            z: position[2],
            duration: 2,
            ease: 'circ.inOut',
        });
    }, [state.selectedIdx]);
};
