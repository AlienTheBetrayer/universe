import { useEffect, useRef } from 'react';
import { MovingRectangleCanvas } from '../../../movingrectangle/components/MovingRectangleCanvas';
import './FAQSection.css';
import { useScroll, useSpring, useTransform } from 'motion/react';
import { motion } from 'motion/react';

export const FAQSection = () => {
    // scroll progress into smooth 0% -> 100%
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 10
    });
    const marginTop = useTransform(smoothProgress, v => `${v * 100}%`);

    return (
        <section ref={sectionRef} className='faq-section container'>
            <div className='faq-grid'>
                <div className='faq-questions'>
                    
                </div>

                <div className='faq-lock-rectangle'>
                    <motion.div style={{ marginTop: marginTop }} className='faq-lock-wrapper'>
                        <MovingRectangleCanvas progress={smoothProgress}/>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}