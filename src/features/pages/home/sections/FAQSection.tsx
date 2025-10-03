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
            item: "Code <mark>Quality</mark>",
            dropdown: "I focus on writing <b>clean, modular, and maintainable code</b> that teams can easily build upon. Every solution is designed with scalability, <u>readability</u>, and <mark>long-term stability</mark> in mind."
        },
        {
            item: "Fast Learning",
            dropdown: "I quickly pick up new tools, frameworks, and concepts, then <mark>apply them effectively in real projects.</mark> This adaptability allows me to <b>stay ahead of trends</b> and deliver value without long ramp-up times."
        },
        {
            item: "<mark>3D</mark> & Motion Abilities",
            dropdown: "I create <mark>immersive 3D experiences and fluid motion</mark> that bring interfaces to life. From subtle transitions to complex interactions, I make sure visuals feel purposeful, engaging, and technically smooth."
        },
        {
            item: "Strong Technical Skillset",
            dropdown: "With a solid foundation in modern web technologies, I build solutions that are <b>robust, secure, and performant.</b> My expertise spans from low-level details to <mark>high-level architecture and design patterns.</mark>"
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