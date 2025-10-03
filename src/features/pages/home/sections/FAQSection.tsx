import { useRef } from 'react';
import { MovingRectangleCanvas } from '../../../movingrectangle/components/MovingRectangleCanvas';
import './FAQSection.css';
import { useScroll, useSpring, useTransform } from 'motion/react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export const FAQSection = () => {
    const isMobile = useMediaQuery(768);
    // scroll progress into smooth 0% -> 100%
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 10
    });
    const margin = useTransform(smoothProgress, v => `${v * 100}%`);

    return (
        <section ref={sectionRef} className='faq-section container'>
            <div className='faq-grid'>
                <div className='faq-questions'>
                    
                </div>

                <motion.div style={ isMobile ? { scaleX: smoothProgress } : { scaleY: smoothProgress }} className='faq-progress-bar'>

                </motion.div>

                <div className='faq-lock-rectangle'>
                    <motion.div style={ isMobile ? { marginLeft: margin } : { marginTop: margin }} className='faq-lock-wrapper'>
                        <MovingRectangleCanvas progress={smoothProgress}/>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}