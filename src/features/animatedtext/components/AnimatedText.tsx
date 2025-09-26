import './AnimatedText.css';
import { motion } from "motion/react"

type AnimatedTextType = 'regular' | 'mark' | 'error' | 'highlight';

export interface AnimatedText {
    text: string;
    type: AnimatedTextType;
}

export type TypewriterTags = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';

interface Props {
    as: TypewriterTags;
    delay?: number;
    text: AnimatedText[];
}

interface WrapProps {
    text: string;
    type: AnimatedTextType;
}

const WrapText = ( { text, type }: WrapProps) => {
    switch(type) {
        case 'regular':
            return text;
        case 'error':
            return <u>{ text }</u>;
        case 'highlight':
            return <b>{ text }</b>;
        case 'mark':
            return <mark>{ text }</mark>;
    }
}

export const AnimatedText = ({ delay, as, text, ...rest }: Props) => {
    const MotionTag = motion[as];
    let idx = 0;

    return (
        <div>
            { text.map((segment, i) => (
                <span className='animated-word' key={`word-${i}`}>
                    {
                        Array.from(segment.text).map((letter) => (
                            <MotionTag className='animated-letter' {...rest} key={`animated-letter-${idx}`}
                            initial={{ opacity: 0, filter: 'blur(40px)'  }}
                            animate={{ opacity: 1, filter: 'blur(0px)'  }}
                            transition={{ delay: (delay ?? 0 ) + idx++ / 20, duration: 0.6, type: 'spring', damping: 8, stiffness: 40 }}>
                                <WrapText text={letter} type={segment.type}/>
                            </MotionTag>
                        ))
                    }
                </span>
            ))}

            <br/>
        </div>
    )
}