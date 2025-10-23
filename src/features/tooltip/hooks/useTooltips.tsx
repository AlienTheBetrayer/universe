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
    // refs + variables
    const elementRefs = useRef<TooltipElement[]>([]);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const handlers = useRef<{ enter: () => void; leave: () => void }[]>([]);

    // states
    const [selected, setSelected] = useState<number | false>(false);

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
                    left = 0;
                    translateX = '0';
                } else if (
                    tooltipBounds.right >= document.documentElement.clientWidth
                ) {
                    left =
                        document.documentElement.clientWidth -
                        tooltipBounds.width;
                    translateX = '0';
                }

                tooltipRef.current.style.left = `${left}px`;
                tooltipRef.current.style.top = `${top}px`;
                tooltipRef.current.style.translate = `${translateX} ${translateY}`;
            }
        }
    }, [selected]);

    // user API
    const set = (
        idx: number,
        tooltip: string,
        element: HTMLElement | null,
        direction: TooltipDirection = 'up',
        offset: number = 8
    ) => {
        const handleLeave = () => {
            setSelected(false);
        };

        if (element === null) {
            const h = handlers.current[idx];
            const unmountedElement = elementRefs.current[idx];
            if (h && unmountedElement.element) {
                unmountedElement.element.removeEventListener(
                    'pointerenter',
                    h.enter
                );
                unmountedElement.element.removeEventListener('focus', h.enter);
                unmountedElement.element.removeEventListener(
                    'pointerleave',
                    h.leave
                );
                unmountedElement.element.removeEventListener('blur', h.leave);
                elementRefs.current[idx] = undefined!;
                handlers.current[idx] = undefined!;
            }
        } else {
            const handleEnter = () => setSelected(idx);

            element.addEventListener('pointerenter', handleEnter);
            element.addEventListener('focus', handleEnter);
            element.addEventListener('pointerleave', handleLeave);
            element.addEventListener('blur', handleLeave);
            handlers.current[idx] = { enter: handleEnter, leave: handleLeave };

            elementRefs.current[idx] = {
                direction,
                element,
                idx,
                offset,
                tooltip,
            };
        }
    };

    const render = () => {
        return createPortal(
            <AnimatePresence>
                {selected !== false && (
                    <Tooltip ref={tooltipRef} key={selected}>
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
