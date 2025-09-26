import './AnimatedText.css';
import { motion } from "motion/react"

export type TypewriterTags = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';

interface Props {
    as: TypewriterTags;
    children: string;
    delay?: number;
}

export const AnimatedText = ({ children, delay, as, ...rest }: Props) => {
    const MotionTag = motion[as];
    
    return (
        <div>
            { Array.from(children).map((letter, idx) => (
                <MotionTag className='animated-text' {...rest} key={`animatedtext-${letter}-${idx}`}
                initial={{ opacity: 0, filter: 'blur(40px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: (delay ?? 0 ) + idx / 20, duration: 0.6, type: 'spring', damping: 8, stiffness: 40 }}>
                    {letter}
                </MotionTag>
            ))}
            <br/>
        </div>
    )
}