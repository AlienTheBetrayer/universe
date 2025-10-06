import './HorizontalCatalogue.css';
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import type React from "react";
import { HorizontalCatalogueItem } from './HorizontalCatalogueItem';

export interface CatalogueItem {
    idx: number;
    title: string;
    content: string;
    visible: boolean;
}

interface Props {
    className?: string;
    items: CatalogueItem[];
    containerRef: React.RefObject<HTMLElement | null>;
}

export const HorizontalCatalogue = ({ className='', items, containerRef }: Props) => {
    const { scrollYProgress } = useScroll({ target: containerRef });
    const scrollYSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const clampedY = useTransform(scrollYSpring, 
        [0, 0.3, 1],
        [0, 0, 1]);
    const scrollYPercentage = useTransform(clampedY, val => `${-val * 50}%`);

    return (
        <div className={`horizontal-content-container ${className}`}>
            <div className='horizontal-content'>
                <h3>Catalogue items: ({items.length} available)</h3>

                <div className='horizontal-scroll-container'>
                    <motion.div className='horizontal-scroll'
                    style={{ x: scrollYPercentage }}>
                        { items.map(item => (
                            <HorizontalCatalogueItem item={item}/>
                        ))}
                    </motion.div>
                </div>

                <motion.div className='horizontal-scroll-progress'
                style={{ scaleX: clampedY }}/>

                <p className='catalogue-scroll-tooltip'>Scroll down to see more</p>
            </div>
        </div>
    )
}