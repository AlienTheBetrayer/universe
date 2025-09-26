import './LockSection.css';
import { useEffect, useRef, useState } from 'react';
import { LockCanvas } from '../components/LockCanvas';
import { ArrayTypewriter } from '../../../arraytypewriter/components/ArrayTypewriter';
import { useScroll } from 'motion/react';

export const LockSection = () => {
    const scrollRef = useRef<HTMLElement>(null);

    const words = [
        'Developing professional apps',
        'Building scalable things',
        'And ultimately destroying it all',
    ];

    const [wordIdx, setWordIdx] = useState<number>(0);
    const [letterIdx, setLetterIdx] = useState<number>(-1);

    const { scrollYProgress } = useScroll({ target: scrollRef }); 

    useEffect(() => {
        const handle = (progress: number) => {
            const wordIndex = Math.floor(progress * words.length);
            const segmentSize = 1 / words.length;
            let letterIndex = Math.floor(progress % segmentSize * words.length * words[wordIndex].length);
            
            if(progress == 0)
                letterIndex = -1;

            setWordIdx(wordIndex);
            setLetterIdx(letterIndex);
        }

        const unsub = scrollYProgress.on('change', progress => handle(progress));
        return () => unsub();
    }, [scrollYProgress]);

    return (
        <section ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockCanvas ref={scrollRef}/>
                <div className='absolute left-20 top-50'>
                    <ArrayTypewriter as='h1' words={words} wordIdx={wordIdx} letterIdx={letterIdx}>

                    </ArrayTypewriter>
                </div>
            </div>
        </section>
    )
}