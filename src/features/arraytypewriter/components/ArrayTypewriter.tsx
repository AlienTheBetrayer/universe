import './ArrayTypewriter.css';
import type { TypewriterTags } from '../../animatedtext/components/AnimatedText';
import {
    AnimatePresence,
    motion,
    MotionValue,
    type HTMLMotionProps,
} from 'motion/react';
import { useArrayTypewriter } from '../hooks/useArrayTypewriter';

interface Props extends HTMLMotionProps<'h1'> {
    scrollProgress: MotionValue<number>;
    words: string[];
    as?: TypewriterTags;
}

export const ArrayTypewriter = ({
    scrollProgress,
    words,
    as = 'h1',
    style,
    ...rest
}: Props) => {
    const typewriter = useArrayTypewriter(words, scrollProgress);

    const MotionTag = motion[as];

    return (
        <AnimatePresence>
            {Array.from(typewriter.word).map((letter, idx) => (
                <MotionTag
                    className='array-typewriter-letter'
                    key={`arraytypewriter-${idx}`}
                    style={style}
                    {...rest}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ filter: 'blur(40px)' }}
                    transition={{ duration: 0.3 }}
                >
                    {letter}
                </MotionTag>
            ))}

            <motion.div
                className='array-typewriter-progress'
                style={{ ...style }}
            >
                |
            </motion.div>
        </AnimatePresence>
    );
};
