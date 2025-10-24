import gsap from 'gsap';
import { useAnimationControls, useDragControls } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForgeContext } from '../context/ForgeContext';
import type { ForgeCardData } from '../context/types/data';

export const useForgeCard = (card: ForgeCardData) => {
    // context state
    const [state, dispatch] = useForgeContext();
    const isEffected = useMemo(() => {
        for (const val of state.effectSlots.values()) {
            if (val === card.idx) return true;
        }
        return false;
    }, [state.effectSlots, card]);

    // animating progress on hold
    const progressRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween>(null);

    // dragging functionality
    const [selected, setSelected] = useState<boolean>(false);
    const lastEvent = useRef<React.PointerEvent<HTMLButtonElement>>(null);
    const dragControls = useDragControls();
    const controls = useAnimationControls();

    // cursor
    useEffect(() => {
        document.body.style.cursor = state.dragging ? 'grabbing' : 'auto';
    }, [state.dragging]);

    // drag manual controls
    useEffect(() => {
        const duration = 0.75;

        tweenRef.current = gsap.to(progressRef.current, {
            scaleX: selected ? 1 : 0,
            duration,
        });

        // twice as fast as the animation
        const timeout = setTimeout(() => {
            if (selected) dispatch({ type: 'SET_DRAGGING', cardIdx: card.idx });
        }, duration * 500);

        return () => {
            tweenRef.current?.kill();
            clearTimeout(timeout);
        };
    }, [selected]);

    useEffect(() => {
        if (state.dragging === card.idx && lastEvent.current)
            dragControls.start(lastEvent.current);

        if (state.dragging === false) setSelected(false);
    }, [state.dragging]);

    useEffect(() => {
        if (state.awaitingCancel !== card.idx) return;

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

    return {
        isEffected,
        controls,
        dragControls,
        selected,
        setSelected,
        lastEvent,
        progressRef,
    };
};
