import './ArrayTypewriter.css';
import type { TypewriterTags } from "../../animatedtext/components/AnimatedText";
import { AnimatePresence, motion, MotionValue } from "motion/react";
import { useArrayTypewriter } from '../hooks/useArrayTypewriter';

interface Props {
    scrollProgress: MotionValue<number>
    words: string[];
    as?: TypewriterTags;
}

export const ArrayTypewriter = ({ scrollProgress, words, as='h1' } : Props) => {
    const word = useArrayTypewriter(words, scrollProgress);
    
    const MotionTag = motion[as];

    return (
        <AnimatePresence>
            { Array.from(word).map((letter, idx) => (
                <MotionTag className='array-typewriter-letter' key={`arraytypewriter-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1  }}
                exit={{ opacity: 0, x: 10 }}
                transition= {{ duration: 0.3 }}>
                    { letter }
                </MotionTag>
            ))}
        </AnimatePresence>
    )
}