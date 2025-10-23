import gsap from 'gsap';
import { useAnimationControls, useDragControls } from 'motion/react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import { useForgeContext } from '../../context/ForgeContext';
import type { ForgeCardContent } from '../../context/types/data';
import './ForgeCard.css';

interface Props {
    idx: number;
    content: ForgeCardContent;
}

export const ForgeCard = forwardRef<HTMLButtonElement, Props>(
    ({ idx, content }, ref) => {
        // context state
        const [state, dispatch] = useForgeContext();
        const isEffected = useMemo(() => {
            for (const val of state.effectSlots.values()) {
                if (val === content.type) return true;
            }
            return false;
        }, [state.effectSlots, content.type]);

        // animating progress on hold
        const progressRef = useRef<HTMLDivElement>(null);
        const tweenRef = useRef<gsap.core.Tween>(null);

        // dragging functionality
        const [selected, setSelected] = useState<boolean>(false);
        const lastEvent = useRef<React.PointerEvent<HTMLButtonElement>>(null);
        const dragControls = useDragControls();

        const controls = useAnimationControls();

        // drag manual controls
        useEffect(() => {
            const duration = 0.75;

            tweenRef.current = gsap.to(progressRef.current, {
                scaleX: selected ? 1 : 0,
                duration,
            });

            // twice as fast as the animation
            const timeout = setTimeout(() => {
                if (selected)
                    dispatch({ type: 'SET_DRAGGING', idx: idx, card: content });
            }, duration * 500);

            return () => {
                tweenRef.current?.kill();
                clearTimeout(timeout);
            };
        }, [selected]);

        useEffect(() => {
            if (state.dragging.idx === idx && lastEvent.current)
                dragControls.start(lastEvent.current);

            if (state.dragging.idx === false) setSelected(false);
        }, [state.dragging]);

        useEffect(() => {
            if (state.awaitingCancel !== idx) return;

            const timeout = setTimeout(() => {
                dispatch({ type: 'RESTORE_CANCEL' });

                dragControls.stop();
                controls.start({
                    x: 0,
                    y: 0,
                    transition: { type: 'spring', stiffness: 200, damping: 20 },
                });
            }, 300);

            return () => clearTimeout(timeout);
        }, [state.awaitingCancel]);

        return (
            <Button
                enabled={!isEffected}
                animate={controls}
                dragControls={dragControls}
                drag={state.dragging.idx === idx}
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
                onPointerLeave={() => {
                    if (state.dragging.idx !== idx && selected) {
                        setSelected(false);
                    }
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
