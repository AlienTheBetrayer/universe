import './HorizontalCatalogue.css';
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import type React from "react";

export interface CatalogueItem {
    title: string;
    content: string;
    visible: boolean;
}

interface Props {
    items: CatalogueItem[];
    containerRef: React.RefObject<HTMLElement | null>;
}

export const HorizontalCatalogue = ({ items, containerRef }: Props) => {
    const { scrollYProgress } = useScroll({ target: containerRef });
    const scrollYSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const scrollYPercentage = useTransform(scrollYSpring, val => `-${val * 60}%`);

    return (
        <div className='horizontal-content'>
                <div className='horizontal-content-items'>
                    <h2>Items</h2>
                    <motion.div className='horizontal-scroll'
                    style={{ x: scrollYPercentage }}>
                        { items.map(item => (
                            <motion.div
                            whileHover={{ }}
                            style={{ display: item.visible ? 'flex' : 'none' }}>
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
    )
}