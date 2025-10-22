import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from '../components/Tooltip';

type TooltipDirection = 'left' | 'right' | 'down' | 'up';

interface TooltipElement {
    idx: number;
    tooltip: string;
    element: HTMLElement | null;
    direction: TooltipDirection;
    offset: number;
}

export const useTooltips = () => {
    const elementRefs = useRef<TooltipElement[]>([]);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<number | false>(false);

    const [rerender, forceRerender] = useState<number>(-1);

    // filling the array with given elementRefs + event handling
    useEffect(() => {
        const handleLeave = () => {
            setSelected(false);
        };

        const handlers: { enter: () => void; leave: () => void }[] = [];

        elementRefs.current.forEach((el, idx) => {
            const handleEnter = () => setSelected(idx);

            el.element?.addEventListener('pointerenter', handleEnter);
            el.element?.addEventListener('focus', handleEnter);
            el.element?.addEventListener('pointerleave', handleLeave);
            el.element?.addEventListener('blur', handleLeave);

            handlers[idx] = { enter: handleEnter, leave: handleLeave };
        });

        return () => {
            elementRefs.current.forEach((ref, idx) => {
                if(handlers.length > 0) {
                    const h = handlers[idx];
                    ref.element?.removeEventListener('pointerenter', h.enter);
                    ref.element?.removeEventListener('focus', h.enter);
                    ref.element?.removeEventListener('pointerleave', h.leave);
                    ref.element?.removeEventListener('blur', h.leave);
                }
            });
        };
    }, [rerender]);

    // upon tooltip appearance change its position based on the current selected index
    useEffect(() => {
        if (tooltipRef.current && selected !== false) {
            const bounds =
                elementRefs.current[selected].element?.getBoundingClientRect();

            if (bounds) {
                let left = 0;
                let top = 0;
                let translateX = '0';
                let translateY = '0';

                switch (elementRefs.current[selected].direction) {
                    case 'up':
                        left = bounds.left + bounds.width / 2 + window.scrollX;
                        top =
                            bounds.top -
                            elementRefs.current[selected].offset +
                            window.scrollY;
                        translateX = '-50%';
                        translateY = '-100%';
                        break;

                    case 'down':
                        left = bounds.left + bounds.width / 2 + window.scrollX;

                        top =
                            bounds.top +
                            bounds.height +
                            elementRefs.current[selected].offset +
                            window.scrollY;
                        translateX = '-50%';
                        break;

                    case 'left':
                        left =
                            bounds.left -
                            elementRefs.current[selected].offset +
                            window.scrollX;
                        top = bounds.top + bounds.height / 2 + window.scrollY;
                        translateX = '-100%';
                        translateY = '-50%';
                        break;

                    case 'right':
                        left =
                            bounds.left +
                            bounds.width +
                            elementRefs.current[selected].offset +
                            window.scrollX;
                        top = bounds.top + bounds.height / 2 + window.scrollY;
                        translateY = '-50%';
                        break;
                }

                tooltipRef.current.style.left = `${left}px`;
                tooltipRef.current.style.top = `${top}px`;
                tooltipRef.current.style.translate = `${translateX} ${translateY}`;
                tooltipRef.current.style.display = 'flex';

                const tooltipBounds =
                    tooltipRef.current.getBoundingClientRect();

                if (tooltipBounds.left < 0) {
                    left = bounds.left;
                    translateX = '0';
                } else if (tooltipBounds.right > window.innerWidth) {
                    left = bounds.right - tooltipBounds.width;
                    translateX = '0';
                }

                tooltipRef.current.style.left = `${left}px`;
                tooltipRef.current.style.top = `${top}px`;
                tooltipRef.current.style.translate = `${translateX} ${translateY}`;
            }
        }
    }, [selected]);

    // user functions
    const set = (
        idx: number,
        tooltip: string,
        element: HTMLElement | null,
        direction: TooltipDirection = 'up',
        offset: number = 8
    ) => {
        forceRerender(idx);
        elementRefs.current[idx] = {
            idx,
            element,
            tooltip,
            direction,
            offset,
        };
    };

    const render = () => {
        return createPortal(
            <AnimatePresence>
                {selected !== false && (
                    <Tooltip ref={tooltipRef}>
                        {elementRefs.current[selected].tooltip}
                    </Tooltip>
                )}
            </AnimatePresence>,
            document.body
        );
    };

    return {
        set,
        render,
    };
};
