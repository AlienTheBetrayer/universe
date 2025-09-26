import './LockSection.css';
import { useRef } from 'react';
import { LockCanvas } from '../components/LockCanvas';
import { ArrayTypewriter } from '../../../arraytypewriter/components/ArrayTypewriter';
import { useScroll, useSpring } from 'motion/react';
import { useValueMotion } from '../../../../hooks/useValueMotion';

export const LockSection = () => {
    const scrollRef = useRef<HTMLElement>(null);

    const leftWords = [
        'Thinking...',
        'Developing...',
        'Refactoring...',
        'Deploying...',
        'Done!'
    ];

    const rightWords = [
        'Are you ready?',
        'To see?'
    ];

    const { scrollYProgress } = useScroll({ target: scrollRef }); 
    const scrollSpringed = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
    const progressValue = useValueMotion(scrollSpringed);
    
    const letterStyle = { color: `rgb(${progressValue * 255}, 0, ${(1 - progressValue) * 255})`, fontSize: '3rem' };


    return (
        <section ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockCanvas ref={scrollRef}/>
                <div className='sphere-canvas-text-left'>
                    <ArrayTypewriter scrollProgress={scrollSpringed} words={leftWords} style={letterStyle}>

                    </ArrayTypewriter>
                </div>

                <div className='sphere-canvas-text-right'>
                    <ArrayTypewriter scrollProgress={scrollSpringed} words={rightWords} style={letterStyle}>

                    </ArrayTypewriter>
                </div>
            </div>
        </section>
    )
}