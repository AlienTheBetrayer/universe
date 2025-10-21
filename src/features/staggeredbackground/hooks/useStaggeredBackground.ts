import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useState, type RefObject } from 'react';

export const ElementSize = 64;

export const useStaggeredBackground = (
    ref: RefObject<HTMLDivElement | null>,
) => {
    const [columns, setColumns] = useState<number>(0);
    const [rows, setRows] = useState<number>(0);

    // resize handling + generating rows / columns
    useEffect(() => {
        const handle = () => {
            if (ref.current) {
                const containerRect = ref.current.getBoundingClientRect();
                setColumns(containerRect.width / ElementSize);
                setRows(containerRect.height / ElementSize);
            }
        };
        handle();

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);

    // animations
    useGSAP(
        () => {
            const timeline = gsap.timeline();

            timeline
                .fromTo(
                    '.staggered-background-element',
                    {
                        scale: 0,
                        y: () => gsap.utils.random(-300, 300),
                        x: () => gsap.utils.random(-300, 300),
                        borderRadius: 48,
                        rotate: () => gsap.utils.random(0, 360),
                        opacity: 0.5,
                    },
                    {
                        delay: 2,
                        duration: 1,
                        x: 0,
                        y: 0,
                        rotate: () => gsap.utils.random(0, 360),
                        scale: 0.8,
                        opacity: 0.05,
                        stagger: {
                            each: 0.15,
                            from: 'start',
                        },
                    },
                )
                .to(
                    '.staggered-background-element',
                    {
                        duration: 4,
                        rotate: 0,
                        scale: 1,
                        borderRadius: 8,
                        ease: 'back.inOut',
                        stagger: {
                            each: 0.15,
                            from: 'start',
                        },
                    },
                    '3',
                );
        },
        { scope: ref, dependencies: [rows, columns] },
    );

    return {
        columns,
        rows,
    };
};
