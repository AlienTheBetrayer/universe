import './HorizontalCatalogue.css';
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import type React from "react";
import { HorizontalCatalogueItem } from './HorizontalCatalogueItem';
import { useEffect, useState } from 'react';
import { usePopup } from '../../../hooks/usePopup';
import { HorizontalOrderPopup } from './HorizontalOrderPopup';

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
    // scroll logic
    const { scrollYProgress } = useScroll({ target: containerRef });
    const scrollYSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const clampedY = useTransform(scrollYSpring, 
        [0, 0.2, 0.8, 1],
        [0, 0, 1, 1]);
    const scrollYPercentage = useTransform(clampedY, val => `${-val * 100}%`);

    // items ordering + popup logic
    const [orderedItems, setOrderedItems] = useState<CatalogueItem[]>([]);
    
    useEffect(() => {
        if(orderedItems.length == 0)
            return;

        orderedPopup.setShown(true);

        const timeout = setTimeout(() => {
            orderedPopup.setShown(false);
            setOrderedItems([]);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [orderedItems]);

    const orderedPopup = usePopup(<HorizontalOrderPopup items={orderedItems}/>, false);
    
    return (
        <div className={`horizontal-content-container ${className}`}>
            <div className='horizontal-content'>
                <h3>Catalogue items: ({items.length} available)</h3>

                <div className='horizontal-scroll-container'>
                    <motion.div className='horizontal-scroll'
                    style={{ x: scrollYPercentage }}>
                        { items.map((item, idx) => (
                            <HorizontalCatalogueItem key={idx} item={item} onPurchase={item => setOrderedItems(prev => [...prev, item])}/>
                        ))}
                    </motion.div>
                </div>

                <motion.div className='horizontal-scroll-progress'
                style={{ scaleX: clampedY }}/>

                <p className='catalogue-scroll-tooltip'>Scroll down to see more</p>
            </div>

            { orderedPopup.render() }
        </div>
    )
}