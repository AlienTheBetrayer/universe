import React, { useEffect, useRef, useState } from "react";
import { useBackgroundBlur } from "../../backgroundblur/hooks/useBackgroundBlur";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { HoverContents } from "../components/HoverContents";

export const useSphereCardPopup = (ref: React.RefObject<HTMLElement | null>, title?: string, description?: string) => {
    const [hovered, setHovered] = useState<boolean>(false);
    
    const copyRef = useRef<HTMLElement>(null);
    const blur = useBackgroundBlur(10, false);

    // set the hover's card position
    useEffect(() => {
        if(hovered && ref.current && copyRef.current) {
            const bounds = ref.current.getBoundingClientRect();

            copyRef.current.style.left = `${bounds.left}px`;
            copyRef.current.style.top = `${bounds.top + window.scrollY}px`;
            copyRef.current.style.width = `${bounds.width}px`;
            copyRef.current.style.height = `${bounds.height}px`;
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
                            <motion.article ref={copyRef} className='sphere-card popup'
                            key='hover-popup'
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            exit={{ scale: 1, opacity: 0 }}>
                                <HoverContents title={title} description={description}/>
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