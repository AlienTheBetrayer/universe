import React, { useEffect, useRef } from 'react';
import { useBackgroundBlur } from '../../backgroundblur/hooks/useBackgroundBlur';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { HoverContents } from '../components/HoverContents';

type HoveredState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const useSphereCardPopup = (
    hovered: HoveredState,
    ref: React.RefObject<HTMLElement | null>,
    title?: string,
    description?: string,
) => {
    const copyRef = useRef<HTMLElement>(null);
    const blur = useBackgroundBlur(() => {}, false);

    // set the hover's card position
    useEffect(() => {
        if (hovered && ref.current && copyRef.current) {
            const bounds = ref.current.getBoundingClientRect();

            copyRef.current.style.left = `${bounds.left}px`;
            copyRef.current.style.top = `${bounds.top + window.scrollY}px`;
            copyRef.current.style.width = `${bounds.width}px`;
            copyRef.current.style.height = `${bounds.height}px`;
        }
        blur.setShown(hovered[0]);
    }, [hovered, ref, copyRef]);

    // listener to fix laggy cards from still being hovered even though we're not
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();

                const inside =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;
                if (!inside) hovered[1](false);
            }
        };

        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
    }, []);

    const render = () => {
        return (
            <>
                {createPortal(
                    <AnimatePresence>
                        {hovered[0] && (
                            <motion.article
                                ref={copyRef}
                                className='sphere-card popup'
                                style={{ zIndex: 1000 }}
                                key='hover-popup'
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                exit={{ scale: 1, opacity: 0 }}
                                onPointerLeave={() => hovered[1](false)}
                            >
                                <HoverContents
                                    title={title}
                                    description={description}
                                />
                            </motion.article>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
                {blur.render()}
            </>
        );
    };

    return { render };
};
