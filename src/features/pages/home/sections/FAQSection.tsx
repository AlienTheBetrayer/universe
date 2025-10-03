import { useRef, useState } from 'react';
import { MovingRectangleCanvas } from '../../../movingrectangle/components/MovingRectangleCanvas';
import './FAQSection.css';
import { useScroll, useSpring } from 'motion/react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

import hoverImg from '../../../../assets/cursor.svg';
import { Accordion, type AccordionItem } from '../../../accordion/components/Accordion';

export const FAQSection = () => {
    const isMobile = useMediaQuery(768);
    // scroll progress into smooth 0% -> 100%
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 40
    });

    const questions: AccordionItem[] = [
        {
            item: "Approach to Design",
            dropdown: "Clarity first, then motion. I build interfaces that are simple to use and feel responsive through subtle interaction."
        },
        {
            item: "Development Process",
            dropdown: "Plan, prototype, iterate. I keep workflows efficient with quick feedback loops and a strong focus on performance."
        },
        {
            item: "Focus Areas",
            dropdown: "Interactive UIs, 3D visuals, and motion-driven experiences that blend creativity with functionality."
        },
        {
            item: "Collaboration",
            dropdown: "Clear communication, adaptability, and consistent delivery are my priorities when working with teams or clients."
        }
    ];

    const [selected, setSelected] = useState<number>(-1);

    return (
        <section ref={sectionRef} className='faq-section container'>
            <div className='faq-grid'>
                <div className='faq-questions'>
                    <div className='faq-questions-accordion'>
                        <Accordion items={questions} onSelect={(idx) => setSelected(idx)}>
                            
                        </Accordion>
                    </div>

                    <div className='faq-questions-X'>

                    </div>
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