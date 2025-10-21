import { useFrame } from '@react-three/fiber';
import { ChromaticAberration } from '@react-three/postprocessing';
import { ChromaticAberrationEffect } from 'postprocessing';
import React, { useEffect, useRef } from 'react';

interface Props {
    shown: React.RefObject<boolean>;
}

// don't rerender! will crash
export const _MovingRectangleAberation = ({ shown }: Props) => {
    const effectRef = useRef<ChromaticAberrationEffect>(null);
    const isMobile = window.matchMedia('(max-width: 640px)').matches;

    useEffect(() => {
        if (effectRef.current) {
            effectRef.current.offset.x = 0;
            effectRef.current.offset.y = 0;
        }
    }, []);

    useFrame(() => {
        const targetOffset = shown.current ? (isMobile ? 0.1 : 0.3) : 0;
        if (effectRef.current) {
            effectRef.current.offset.x +=
                (targetOffset - effectRef.current.offset.x) * 0.1;
            effectRef.current.offset.y +=
                (targetOffset - effectRef.current.offset.y) * 0.1;
        }
    });

    return <ChromaticAberration ref={effectRef} offset={[0, 0]} />;
};

export const MovingRectangleAberation = React.memo(_MovingRectangleAberation);
