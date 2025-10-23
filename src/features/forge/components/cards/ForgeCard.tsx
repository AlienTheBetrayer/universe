import gsap from 'gsap';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import './ForgeCard.css';
import type { ForgeCardContent } from './ForgeCards';

interface Props {
    content: ForgeCardContent;
}

export const ForgeCard = forwardRef<HTMLButtonElement, Props>(
    ({ content }, ref) => {
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
                className='forge-card'
                ref={ref}
                onPointerDown={() => setSelected(true)}
                onPointerUp={() => setSelected(false)}
            >
                <img
                    src={content.image}
                    alt=''
                    className={`${
                        content.inverted === true ? 'forge-image-inverted' : ''
                    }`}
                    style={{ zIndex: 1, width: '24px', height: '24px' }}
                />

                <span style={{ zIndex: 1 }}>{content.title}</span>

                <div
                    style={{ zIndex: 0 }}
                    ref={progressRef}
                    className='forge-card-progress'
                ></div>
            </Button>
        );
    }
);
