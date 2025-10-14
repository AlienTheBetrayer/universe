import { Button } from "../../Button/components/Button"
import React, { forwardRef, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PopoverBackground } from "./PopoverBackground";

import { AnimatePresence, type HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useHotkeys } from "../../../../hooks/useHotkeys";

interface Props extends HTMLMotionProps<'button'> {
    enabled?: boolean;
    element: React.ReactElement<any>;
    onClick?: () => void;
    offset?: number;
    direction?: 'left' | 'right';
}

export const PopoverButton = forwardRef<HTMLButtonElement, Props>(({ children, element, onClick, enabled, offset=4, direction='left', ...rest }, ref) => {
    const [shown, setShown] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLElement>(null);

    const handlePopoverRef = (el: HTMLElement | null) => {
        popoverRef.current = el;

        if (el && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            el.style.position = 'absolute';

            switch(direction) {
                case 'left':
                    el.style.left = `${buttonRect.left + window.scrollX}px`;
                    el.style.top = `${buttonRect.top + buttonRect.height + offset + window.scrollY}px`;
                break;
                case 'right':
                    el.style.left = `${buttonRect.right - elRect.width + window.scrollX}px`;
                    el.style.top = `${buttonRect.top + buttonRect.height + offset + window.scrollY}px`;
                break;
            }
        }
    }

    useHotkeys([
        { hotkey: 'Escape', action: () => setShown(false) }
    ])

    return (
        <>
            { createPortal(
                <AnimatePresence>
                    { shown && (
                        <>
                            <PopoverBackground onInteract={() => setShown(false)}/>

                            <motion.div
                            style={{ zIndex: 31 }}
                            ref={handlePopoverRef}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0  }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ ease: 'linear', duration: 0.15 }}>
                                { React.cloneElement(element, {
                                    onCancel: () => setShown(false)
                                })}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            ,document.body)}

            <Button
            ref={el => { 
                buttonRef.current = el;  

                if(typeof ref === 'function') {
                    ref(el);
                } else if(ref) {
                    ref.current = el;
                }
             }}
            enabled={enabled}
            onClick={ () => {
                setShown(prev => !prev);
                onClick?.();
            }} {...rest}>
                { children }
            </Button>
        </>
    )
});