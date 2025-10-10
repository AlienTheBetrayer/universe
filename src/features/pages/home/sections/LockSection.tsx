import './LockSection.css';
import { useRef } from 'react';
import { ArrayTypewriter } from '../../../arraytypewriter/components/ArrayTypewriter';
import { useScroll, useSpring } from 'motion/react';
import { useValueMotion } from '../../../../hooks/useValueMotion';
import { LockCanvas } from '../../../locksphere/components/LockCanvas';
import { Color, type HSL } from 'three';

export const LockSection = () => {
    const scrollRef = useRef<HTMLElement>(null);

    const leftWords = [
        'Thinking...',
        'Developing...',
        'Refactoring...',
        'Deploying...',
        'Done!'
    ];

    const { scrollYProgress } = useScroll({ target: scrollRef }); 
    const scrollSpringed = useSpring(scrollYProgress, { stiffness: 100, damping: 10 });
    const progressValue = useValueMotion(scrollSpringed);
    
    const color = new Color(progressValue, 0, (1 - progressValue));
    const hsl: HSL = { h: 0, s: 0, l: 0};
    color.getHSL(hsl);
    hsl.s *= 0.7;
    color.setHSL(hsl.h, hsl.s, hsl.l);

    const letterStyle = { color: `#${color.getHexString()}` };

    return (
        <section ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockCanvas ref={scrollRef}/>

                <div className='sphere-canvas-typewriter'>
                    <ArrayTypewriter as='h2' scrollProgress={scrollSpringed} words={leftWords} style={letterStyle}/>
                </div>

                <div className='sphere-canvas-heading'>
                    <h2>Moving in <mark>space</mark></h2>
                </div>
            </div>
        </section>
    )
}