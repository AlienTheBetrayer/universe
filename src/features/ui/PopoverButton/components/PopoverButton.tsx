import React, { forwardRef, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../Button/components/Button';
import { PopoverBackground } from './PopoverBackground';

import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { useHotkeys } from '../../../../hooks/useHotkeys';

interface Props extends HTMLMotionProps<'button'> {
    enabled?: boolean;
    element: React.ReactElement<any>;
    onClick?: () => void;
    offset?: number;
    direction?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export const PopoverButton = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children,
            element,
            onClick,
            enabled,
            offset = 4,
            direction = 'bottom-left',
            ...rest
        },
        ref
    ) => {
        const [shown, setShown] = useState<boolean>(false);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const popoverRef = useRef<HTMLDivElement>(null);

        const handlePopoverRef = (el: HTMLDivElement | null) => {
            popoverRef.current = el;

            if (el && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                el.style.position = 'absolute';
                const elRect = el.getBoundingClientRect();

                switch (direction) {
                    case 'bottom-right':
                        el.style.left = `${buttonRect.left + window.scrollX}px`;
                        el.style.top = `${
                            buttonRect.top +
                            buttonRect.height +
                            offset +
                            window.scrollY
                        }px`;
                        break;

                    case 'bottom-left':
                        el.style.left = `${
                            buttonRect.right - elRect.width + window.scrollX
                        }px`;
                        el.style.top = `${
                            buttonRect.top +
                            buttonRect.height +
                            offset +
                            window.scrollY
                        }px`;
                        break;

                    case 'top-right':
                        el.style.left = `${buttonRect.left + window.scrollX}px`;
                        el.style.top = `${
                            buttonRect.top -
                            elRect.height -
                            offset +
                            window.scrollY
                        }px`;
                        break;

                    case 'top-left':
                        el.style.left = `${
                            buttonRect.right - elRect.width + window.scrollX
                        }px`;
                        el.style.top = `${
                            buttonRect.top -
                            elRect.height -
                            offset +
                            window.scrollY
                        }px`;
                        break;
                }
            }
        };

        useHotkeys([{ hotkey: 'Escape', action: () => setShown(false) }]);

        return (
            <>
                {createPortal(
                    <AnimatePresence>
                        {shown && (
                            <>
                                <PopoverBackground
                                    onInteract={() => setShown(false)}
                                />

                                <motion.div
                                    style={{ zIndex: 31 }}
                                    ref={handlePopoverRef}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{
                                        ease: 'linear',
                                        duration: 0.15,
                                    }}
                                >
                                    {React.cloneElement(element, {
                                        onCancel: () => setShown(false),
                                    })}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

                <Button
                    ref={(el) => {
                        buttonRef.current = el;

                        if (typeof ref === 'function') {
                            ref(el);
                        } else if (ref) {
                            ref.current = el;
                        }
                    }}
                    enabled={enabled}
                    onClick={() => {
                        setShown((prev) => {
                            return !prev;
                        });
                        onClick?.();
                    }}
                    {...rest}
                >
                    {children}
                </Button>
            </>
        );
    }
);
