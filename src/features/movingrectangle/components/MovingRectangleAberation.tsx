import { useFrame } from "@react-three/fiber";
import { ChromaticAberration }from "@react-three/postprocessing"
import { ChromaticAberrationEffect } from 'postprocessing'
import React, { useEffect, useRef } from "react";

interface Props {
    shown: React.RefObject<boolean>;
}

export const _MovingRectangleAberation = ({ shown }: Props) => {
    const effectRef = useRef<ChromaticAberrationEffect>(null)
    
    useEffect(() => {
        if(effectRef.current) {
            effectRef.current.offset.x = 0;
            effectRef.current.offset.y = 0;
        }
    }, []);

    useFrame(() => {
        const targetOffset = shown.current ? 0.5 : 0;
        if(effectRef.current) {
            // smooth lerp each frame toward target
            effectRef.current.offset.x += (targetOffset - effectRef.current.offset.x) * 0.15;
            effectRef.current.offset.y += (targetOffset - effectRef.current.offset.y) * 0.15;

        }

    });

    return (
        <ChromaticAberration ref={effectRef} offset={[0, 0]}/>
    )
}

export const MovingRectangleAberation = React.memo(_MovingRectangleAberation);