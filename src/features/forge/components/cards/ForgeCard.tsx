import gsap from 'gsap';
import { useAnimationControls, useDragControls } from 'motion/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { Button } from '../../../ui/Button/components/Button';
import './ForgeCard.css';
import type { ForgeCardContent } from './ForgeCards';
import { useForgeContext } from '../../context/ForgeContext';

interface Props {
    content: ForgeCardContent;
}

export const ForgeCard = forwardRef<HTMLButtonElement, Props>(
    ({ content }, ref) => {
        // context state
        const [state, dispatch] = useForgeContext();

        // animating progress on hold
        const progressRef = useRef<HTMLDivElement>(null);
        const tweenRef = useRef<gsap.core.Tween>(null);

        // dragging functionality
        const [selected, setSelected] = useState<boolean>(false);
        const [isDraggable, setIsDraggable] = useState<boolean>(false);
        const lastEvent = useRef<React.PointerEvent<HTMLButtonElement>>(null);
        const dragControls = useDragControls();

        const controls = useAnimationControls();

        // drag manual controls
        useEffect(() => {
            const duration = 1;

            tweenRef.current = gsap.to(progressRef.current, {
                scaleX: selected ? 1 : 0,
                duration,
            });

            // twice as fast as the animation
            const timeout = setTimeout(
                () => setIsDraggable(selected),
                duration * 500
            );

            return () => {
                tweenRef.current?.kill();
                clearTimeout(timeout);
            };
        }, [selected]);

        useEffect(() => {
            if (isDraggable && lastEvent.current) {
                dragControls.start(lastEvent.current);
            }
            dispatch({ type: 'SET_IS_DRAGGING', flag: isDraggable });
        }, [isDraggable]);

        const cancelDragging = () => {
            dragControls.stop();
            controls.start({
                x: 0,
                y: 0,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
            });
        };

        useHotkeys([{ hotkey: 'Escape', action: () => cancelDragging() }]);

        return (
            <Button
                animate={controls}
                dragControls={dragControls}
                drag={isDraggable}
                dragMomentum={false}
                dragListener={false}
                dragTransition={{
                    bounceStiffness: 600,
                    bounceDamping: 10,
                }}
                className='forge-card'
                ref={ref}
                onPointerDown={(e) => {
                    setSelected(true);
                    lastEvent.current = e;
                }}
                onPointerUp={() => setSelected(false)}
            >
                <img
                    draggable={false}
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
