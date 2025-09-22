import { useEffect, useRef, useState } from "react";
import { useBackgroundBlur } from "../../backgroundblur/hooks/useBackgroundBlur";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

export const useHoverCard = (ref: React.RefObject<HTMLElement | null>, Contents: React.FC) => {
    const [hovered, setHovered] = useState<boolean>(false);
    
    const copyRef = useRef<HTMLElement>(null);
    const blur = useBackgroundBlur(10, false);

    // set the hover's card position
    useEffect(() => {
        if(hovered && ref.current && copyRef.current) {
            const bounds = ref.current.getBoundingClientRect();

            copyRef.current.style.left = `${bounds.left}px`;
            copyRef.current.style.top = `${bounds.top + window.scrollY}px`;
        }
        blur.setShown(hovered);
    }, [hovered, ref, copyRef]);

    // handle the mouse enter / leave on individual card
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if(ref.current) {
                const rect = ref.current.getBoundingClientRect();

                const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
                setHovered(inside);
            }
        }

        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
    }, []);

    const render = () => {
        return (
            <>
                { 
                createPortal(
                    <AnimatePresence>
                        { hovered && (
                            <motion.article ref={copyRef} className='hover-card popup'
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            exit={{ scale: 1, opacity: 0 }}>
                                <Contents/>
                            </motion.article>
                        )}
                    </AnimatePresence>, document.body)
                }
                { blur.render() }
            </>
        )
    }

    return { render };
}