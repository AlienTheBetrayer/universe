import './LockSection.css';
import { useRef } from 'react';
import { ArrayTypewriter } from '../../../arraytypewriter/components/ArrayTypewriter';
import { useScroll, useSpring } from 'motion/react';
import { useValueMotion } from '../../../../hooks/useValueMotion';
import { LockCanvas } from '../../../locksphere/components/LockCanvas';

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
    
    const letterStyle = { color: `rgb(${progressValue * 255}, 0, ${(1 - progressValue) * 255})` };

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