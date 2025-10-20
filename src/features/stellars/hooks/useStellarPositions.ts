import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useStellarContext } from '../context/StellarContext';

export const useStellarPositions = () => {
    const [state, dispatch] = useStellarContext();
    const tweensRef = useRef<gsap.core.Tween[]>([]);

    // random positioning of stellars + animating toward them
    const generate = () => {
        if (state.stellars.length === 0) return;

        tweensRef.current.forEach((t) => t.kill());
        tweensRef.current = [];

        const xy: { x: number; y: number; idx: number }[] = [];
        state.stellars.forEach((stellar) =>
            xy.push({ x: 0, y: 0, idx: stellar.idx })
        );

        xy.forEach((obj) => {
            const tween = gsap.to(obj, {
                x: (Math.random() - 0.5) * state.viewport.width * 0.9,
                y: (Math.random() - 0.5) * state.viewport.height * 0.7,
                duration: 2 * (1 + Math.random()),
                ease: 'back.inOut',
                onUpdate: () =>
                    dispatch({
                        type: 'STELLAR_MOVE',
                        idx: obj.idx,
                        x: xy.find((e) => e.idx === obj.idx)!.x,
                        y: xy.find((e) => e.idx === obj.idx)!.y,
                    }),
            });

            tweensRef.current.push(tween);
        });
    };

    // animation cleanup to prevent updating values that aren't mounted anymore (memory leak fix)
    const clear = () => {
        tweensRef.current.forEach((t) => t.kill());
        tweensRef.current = [];
    };

    useEffect(() => {
        if (state.stellars.length == 0) clear();
    }, [state.stellars]);

    useEffect(() => {
        return () => {
            clear();
        };
    }, []);

    return {
        generate,
        clear,
    };
};
