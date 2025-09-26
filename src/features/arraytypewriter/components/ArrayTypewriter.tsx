import './ArrayTypewriter.css';
import { useEffect, useState } from "react"
import type { TypewriterTags } from "../../animatedtext/components/AnimatedText";
import { AnimatePresence, motion } from "motion/react";

interface Props {
    words: string[];
    as: TypewriterTags;
    wordIdx: number;
    letterIdx: number;
}

export const ArrayTypewriter = ({ words, as, wordIdx, letterIdx } : Props) => {
    const MotionTag = motion[as];
    const [word, setWord] = useState<string>(() => {
        let ret = '';
        if(words.length == 0)
            ret = 'words[] is empty';

        return ret;
    });

    useEffect(() => {
        if(wordIdx >= 0 && wordIdx < words.length && letterIdx >= 0 && letterIdx < words[wordIdx].length)
            setWord(words[wordIdx].slice(0, letterIdx + 1));

        if(letterIdx == -1)
            setWord('');
    }, [wordIdx, letterIdx]);

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