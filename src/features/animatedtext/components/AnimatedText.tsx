import './AnimatedText.css';
import { motion } from "motion/react"

export type TypewriterTags = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';

interface Props {
    as: TypewriterTags;
    children: string;
    speed?: number;
    delay?: number;
}

export const AnimatedText = ({ children, delay, speed, as, ...rest }: Props) => {
    const MotionTag = motion[as];
    
    return (
        <div>
            { Array.from(children).map((letter, idx) => (
                <MotionTag className='animated-text' {...rest} key={`animatedtext-${letter}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (delay ?? 0 ) + idx / (20 * (speed ?? 1)), duration: 0.6, type: 'spring', damping: (8 * (speed ?? 1)), stiffness: 400 }}>
                    {letter}
                </MotionTag>
            ))}
            <br/>
        </div>
    )
}