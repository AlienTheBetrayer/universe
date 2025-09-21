import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useBackgroundBlur } from '../../backgroundblur/hooks/useBackgroundBlur';
import './HoverCard.css';

import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { useHoverPopup } from '../../../hooks/useHoverPopup';

interface Props extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    children?: string;
}

export const HoverCard = ({ title, children, className, ...rest }: Props) => {
    const ref = useRef<HTMLElement>(null);
    const copyRef = useRef<HTMLElement>(null);

    const [hovered, setHovered] = useState<boolean>(false);
    const blur = useBackgroundBlur(10);

    useEffect(() => {
        if(hovered && ref.current && copyRef.current) {
            const bounds = ref.current.getBoundingClientRect();

            copyRef.current.style.left = `${bounds.left}px`;
            copyRef.current.style.top = `${bounds.top}px`;
        }
        blur.setShown(hovered);
    }, [hovered, ref, copyRef]);

    return (
        <>
            <article ref={ref} className={`hover-card ${className ?? ''}`}
            onMouseEnter={() => setHovered(true)} {...rest}>
                <h3>{title}</h3>
                <p>{children}</p>
            </article>

            { 
                createPortal(
                    <AnimatePresence>
                        { hovered && (
                            <motion.article ref={copyRef} className='hover-card popup'
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            exit={{ scale: 1, opacity: 0 }}
                            onMouseLeave={() => setHovered(false)}>
                                <h3>{title}</h3>
                                <p>{children}</p>
                            </motion.article>
                        )}
                    </AnimatePresence>, document.body)
            }
            { blur.render() }
        </>
    )
}