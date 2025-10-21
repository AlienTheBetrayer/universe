import { useEffect, useRef, useState } from 'react';
import { MovingRectangleCanvas } from '../../../movingrectangle/components/MovingRectangleCanvas';
import './FAQSection.css';
import { useScroll, useSpring } from 'motion/react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

import hoverImg from '../../../../assets/cursor.svg';
import {
    Accordion,
    type AccordionItem,
} from '../../../accordion/components/Accordion';
import { AnimatePresence } from 'motion/react';
import { cssVariable } from '../../../../utils/cssVariable';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';

export const FAQSection = () => {
    const isMobile = useMediaQuery(768);
    // scroll progress into smooth 0% -> 100%
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 40,
    });

    const questions: AccordionItem[] = [
        {
            item: 'Code <mark>Quality</mark>',
            dropdown:
                'I focus on writing <b>clean, modular, and maintainable code</b> that teams can easily build upon. Every solution is designed with scalability, <u>readability</u>, and <mark>long-term stability</mark> in mind.',
        },
        {
            item: 'Fast Learning',
            dropdown:
                'I quickly pick up new tools, frameworks, and concepts, then <mark>apply them effectively in real projects.</mark> This adaptability allows me to <b>stay ahead of trends</b> and deliver value without long ramp-up times.',
        },
        {
            item: '<mark>3D</mark> & Motion Abilities',
            dropdown:
                'I create <mark>immersive 3D experiences and fluid motion</mark> that bring interfaces to life. From subtle transitions to complex interactions, I make sure visuals feel purposeful, engaging, and technically smooth.',
        },
        {
            item: 'Strong Technical Skillset',
            dropdown:
                'With a solid foundation in modern web technologies, I build solutions that are <b>robust, secure, and performant.</b> My expertise spans from low-level details to <mark>high-level architecture and design patterns.</mark>',
        },
    ];

    const [selected, setSelected] = useState<number>(0);
    const [activeIdx, setActiveIdx] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx(
                (prev) => (prev + 1) % ((selected === -1 ? 0 : selected) + 1),
            );
        }, 1500);

        return () => clearInterval(interval);
    }, [selected]);
    return (
        <RevealingContainer>
            <section ref={sectionRef} className='faq-section container'>
                <div className='faq-grid'>
                    <h2>
                        <mark>Vital</mark> aspects
                    </h2>

                    <div className='faq-content'>
                        <div className='faq-questions'>
                            <h3>
                                Key <mark>Strengths</mark>
                            </h3>

                            <div className='faq-questions-content'>
                                <div className='faq-questions-accordion'>
                                    <Accordion
                                        items={questions}
                                        onSelect={(idx) => setSelected(idx)}
                                    />
                                </div>

                                <div className='faq-questions-animation'>
                                    <AnimatePresence>
                                        {Array.from({
                                            length:
                                                (selected === -1
                                                    ? 0
                                                    : selected) + 1,
                                        }).map((_, idx) => (
                                            <motion.div
                                                onClick={() =>
                                                    setActiveIdx(idx)
                                                }
                                                className='faq-questions-animation-item'
                                                key={idx}
                                                style={{ flex: 1 }}
                                                layout
                                                initial={{
                                                    scale: 1.0,
                                                    filter: 'brightness(1) ',
                                                }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    filter: 'brightness(2)',
                                                }}
                                                whileTap={{
                                                    scale: 1.1,
                                                    filter: 'brightness(3)',
                                                }}
                                                animate={{
                                                    scale:
                                                        idx === activeIdx &&
                                                        selected > 0
                                                            ? 1.1
                                                            : 1,
                                                    filter:
                                                        idx === activeIdx
                                                            ? 'brightness(1.3)'
                                                            : 'brightness(1)',
                                                    background: `linear-gradient(${Math.floor(Math.random() * 360)}deg, 
                                                ${idx === activeIdx ? '#0b0b41ff' : cssVariable('--background-2')}, 
                                                ${idx === activeIdx ? '#4141c9ff' : cssVariable('--background-2')}`,
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 75 * (idx + 1),
                                                    damping: 20,
                                                }}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            style={
                                isMobile
                                    ? { scaleX: smoothProgress }
                                    : { scaleY: smoothProgress }
                            }
                            className='faq-progress-bar'
                        />

                        <div className='faq-lock-rectangle'>
                            <MovingRectangleCanvas progress={smoothProgress} />
                            <img
                                className='faq-lock-hover-img'
                                src={hoverImg}
                                alt='hover'
                            />
                        </div>
                    </div>
                </div>
            </section>
        </RevealingContainer>
    );
};
