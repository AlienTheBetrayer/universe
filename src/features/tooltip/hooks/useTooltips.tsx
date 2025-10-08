import { AnimatePresence } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "../components/Tooltip";

type TooltipDirection = 'left' | 'right' | 'down' | 'up';

interface TooltipElement {
    idx: number;
    tooltip: string;
    element: HTMLElement | null;
    direction: TooltipDirection;
}

export const useTooltips = () => {
    const refs = useRef<TooltipElement[]>([]);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [selected, setSelected] = useState<number | false>(false);
    
    // filling the array with given elements + event handling
    useLayoutEffect(() => {
        const handleEnter = (idx: number) => {
            setSelected(idx);
        }

        const handleLeave = () => {
            setSelected(false);
        }

        refs.current.forEach((ref, idx) => {
            ref.element?.addEventListener('pointerenter', () => handleEnter(idx));
            ref.element?.addEventListener('pointerleave', handleLeave);
        });

        return () => {
            refs.current.forEach((ref, idx) => {
                ref.element?.removeEventListener('pointerenter', () => handleEnter(idx));
                ref.element?.removeEventListener('pointerleave', handleLeave);
            })
        }
    }, [refs.current.length]);
    
    // upon tooltip appearance change its position based on the current selected index
    useEffect(() => {
        if(tooltipRef.current && selected !== false) {
            const bounds = refs.current[selected].element?.getBoundingClientRect();

            if(bounds) {
                let left = '';
                let top = '';
                
                switch(refs.current[selected].direction) {
                    case 'up':
                        left = `${bounds.left + window.scrollX}px`;
                        top = `${bounds.top - bounds.height - 8 + window.scrollY}px`;
                    break;
                    case 'down':
                        left = `${bounds.left + window.scrollX}px`;
                        top = `${bounds.top + bounds.height + 8 + window.scrollY}px`;
                    break;
                    case 'left':
                        left = `${bounds.left - bounds.width - 8 + window.scrollX}px`;
                        top = `${bounds.top + window.scrollY}px`;
                    break;
                    case 'right':
                        left = `${bounds.left + bounds.width + 8 + window.scrollX}px`;
                        top = `${bounds.top + window.scrollY}px`;
                    break;
                }

                tooltipRef.current.style.left = left;
                tooltipRef.current.style.top = top;
                tooltipRef.current.style.display = 'flex';
            }
        }
    }, [selected]);

    // user functions
    const set = (idx: number, tooltip: string, element: HTMLElement | null, direction: TooltipDirection = 'up') => {
        refs.current[idx] = {
            idx, element, tooltip, direction
        };
    }

    const render = () => {
        return createPortal(<AnimatePresence>
            { selected !== false && (
                <Tooltip ref={tooltipRef}>
                    { refs.current[selected].tooltip }
                </Tooltip>
            )}
        </AnimatePresence>, document.body);
    }

    return {
        set,
        render,
    };
}