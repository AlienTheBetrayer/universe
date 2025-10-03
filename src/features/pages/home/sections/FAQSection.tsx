import { useRef, useState } from 'react';
import { MovingRectangleCanvas } from '../../../movingrectangle/components/MovingRectangleCanvas';
import './FAQSection.css';
import { useScroll, useSpring } from 'motion/react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

import hoverImg from '../../../../assets/cursor.svg';

export const FAQSection = () => {
    const isMobile = useMediaQuery(768);
    // scroll progress into smooth 0% -> 100%
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 40
    });

    return (
        <section ref={sectionRef} className='faq-section container'>
            <div className='faq-grid'>
                <div className='faq-questions'>
                    
                </div>

                <motion.div style={ isMobile ? { scaleX: smoothProgress } : { scaleY: smoothProgress }} className='faq-progress-bar'/>

                <div className='faq-lock-rectangle'>
                    <MovingRectangleCanvas progress={smoothProgress}/>
                    <img className='faq-lock-hover-img' src={hoverImg} alt='hover'/>
                </div>
            </div>
        </section>
    )
}