import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "../components/Tooltip";

type TooltipDirection = 'left' | 'right' | 'down' | 'up';

interface TooltipElement {
    idx: number;
    tooltip: string;
    element: HTMLElement | null;
    direction: TooltipDirection;
    offset: number;
}

export const useTooltips = () => {
    const refs = useRef<TooltipElement[]>([]);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [selected, setSelected] = useState<number | false>(false);
    
    const elements = refs.current.map(r => r);

    // filling the array with given elements + event handling
    useEffect(() => {
        const handleLeave = () => {
            setSelected(false);
        }

        const handlers: (() => void)[] = [];

        elements.forEach((el, idx) => {
            const handleEnter = () => setSelected(idx); 

            el.element?.addEventListener('pointerenter', handleEnter);
            el.element?.addEventListener('pointerleave', handleLeave);

            handlers.push(handleEnter);
        });

        return () => {
            refs.current.forEach((ref, idx) => {
                ref.element?.removeEventListener('pointerenter', handlers[idx]);
                ref.element?.removeEventListener('pointerleave', handleLeave);
            })
        }
    }, [elements]);
    
    // upon tooltip appearance change its position based on the current selected index
    useEffect(() => {
        if(tooltipRef.current && selected !== false) {
            const bounds = refs.current[selected].element?.getBoundingClientRect();

            if(bounds) {
                let left = '';
                let top = '';
                
                switch(refs.current[selected].direction) {
                    case 'up':
                        left = `${bounds.left + bounds.width / 2 + window.scrollX}px`;
                        top = `${bounds.top - refs.current[selected].offset + window.scrollY}px`;
                        tooltipRef.current.style.transform = 'translate(-50%, -100%)';
                    break;

                    case 'down':
                        left = `${bounds.left + bounds.width / 2 + window.scrollX}px`;
                        top = `${bounds.top + bounds.height + refs.current[selected].offset + window.scrollY}px`;
                        tooltipRef.current.style.transform = 'translate(-50%)';
                    break;

                    case 'left':
                        left = `${bounds.left - refs.current[selected].offset + window.scrollX}px`;
                        top = `${bounds.top + bounds.height / 2 + window.scrollY}px`;
                        tooltipRef.current.style.transform = 'translate(-100%, -50%)';
                    break;

                    case 'right':
                        left = `${bounds.left + bounds.width + refs.current[selected].offset + window.scrollX}px`;
                        top = `${bounds.top + bounds.height / 2 + window.scrollY}px`;
                        tooltipRef.current.style.transform = 'translate(0, -50%)';
                    break;
                }

                tooltipRef.current.style.left = left;
                tooltipRef.current.style.top = top;
                tooltipRef.current.style.display = 'flex';
            }
        }
    }, [selected]);

    // user functions
    const set = (idx: number, tooltip: string, element: HTMLElement | null, direction: TooltipDirection = 'up', offset: number = 8) => {
        refs.current[idx] = {
            idx, element, tooltip, direction, offset
        };
    }

    const render = () => {
        return createPortal(<AnimatePresence>
            { selected !== false && (
                <Tooltip ref={tooltipRef}>
                    { elements[selected].tooltip }
                </Tooltip>
            )}
        </AnimatePresence>, document.body);
    }

    return {
        set,
        render,
    };
}