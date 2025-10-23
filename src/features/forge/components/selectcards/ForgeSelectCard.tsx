import gsap from 'gsap';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import './ForgeSelectCard.css';

export type ForgeCardType =
    | 'typescript'
    | 'react'
    | 'css'
    | 'html'
    | 'zustand'
    | 'redux'
    | 'javascript'
    | 'nextjs'
    | 'tailwind';

interface Props {
    title: string;
    description: string;
    type: ForgeCardType;
}

export const ForgeSelectCard = forwardRef<HTMLButtonElement, Props>(
    ({ title, description, type }, ref) => {
        const [selected, setSelected] = useState<boolean>(false);
        const progressRef = useRef<HTMLDivElement>(null);
        const tweenRef = useRef<gsap.core.Tween>(null);
        const [isDraggable, setIsDraggable] = useState<boolean>(false);

        useEffect(() => {
            tweenRef.current = gsap.to(progressRef.current, {
                scaleX: selected ? 1 : 0,
                duration: 1,
                onComplete: () => {
                    setIsDraggable(selected);
                },
            });

            return () => {
                tweenRef.current?.kill();
            };
        }, [selected]);

        return (
            <Button
                drag={isDraggable}
                transition={{ duration: 0 }}
                className='forge-select-card'
                ref={ref}
                onPointerDown={() => setSelected(true)}
                onPointerUp={() => setSelected(false)}
            >
                <span style={{ zIndex: 1 }}>{title}</span>

                <div
                    style={{ zIndex: 0 }}
                    ref={progressRef}
                    className='forge-select-card-progress'
                ></div>
            </Button>
        );
    }
);
