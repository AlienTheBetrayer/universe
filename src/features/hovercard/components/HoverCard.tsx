import { useEffect, useState } from 'react';
import { useBackgroundBlur } from '../../backgroundblur/hooks/useBackgroundBlur';
import './HoverCard.css';

import { hover, motion, type HTMLMotionProps } from 'motion/react';

interface Props extends HTMLMotionProps<'article'> {
    title?: string;
    children?: string;
}

export const HoverCard = ({ title, children, className, ...rest }: Props) => {
    const blur = useBackgroundBlur(10);

    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(() => {
        blur.show(hovered);
    }, [hovered]);
    
    return (
        <>
            <motion.article className={`hover-card ${className}`}
            initial={{ zIndex: 'inherit' }}
            whileHover={{ scale: 1.1, zIndex: 11 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
                <h3>{title}</h3>
                <p>{children}</p>
            </motion.article>

            { blur.render() }
        </>
    )
}