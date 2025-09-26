import './LockSection.css';
import { useEffect, useRef, useState } from 'react';
import { LockCanvas } from '../components/LockCanvas';
import { ArrayTypewriter } from '../../../arraytypewriter/components/ArrayTypewriter';
import { useScroll, useSpring } from 'motion/react';

export const LockSection = () => {
    const scrollRef = useRef<HTMLElement>(null);

    const words = [
        'Developing professional apps',
        'Building scalable things',
        'And ultimately destroying it all',
    ];

    const { scrollYProgress } = useScroll({ target: scrollRef }); 
    const scrollSpringed = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <section ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockCanvas ref={scrollRef}/>
                <div className='sphere-canvas-text-left'>
                    <ArrayTypewriter scrollProgress={scrollSpringed} words={words}>

                    </ArrayTypewriter>
                </div>

                <div className='sphere-canvas-text-right'>
             
                </div>
            </div>
        </section>
    )
}