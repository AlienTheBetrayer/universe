import type { MotionValue } from "motion";
import { useEffect, useState } from "react";

export const useArrayTypewriter = (words: string[], scrollProgress: MotionValue<number>) => {
    const [wordIdx, setWordIdx] = useState<number>(0);
    const [letterIdx, setLetterIdx] = useState<number>(-1);
    
    const [word, setWord] = useState<string>('');
    const [cursorVisible, setCursorVisible] = useState<boolean>(true);

    useEffect(() => {
        const handle = (progress: number) => {
            if(progress < 1) {
                const wordIndex = Math.floor(progress * words.length);
                const segmentSize = 1 / words.length;
                let letterIndex = Math.floor(progress % segmentSize * words.length * words[wordIndex].length);
                
                if(progress == 0)
                    letterIndex = -1;
    
                setWordIdx(wordIndex);
                setLetterIdx(letterIndex);
            }
        }

        const unsub = scrollProgress.on('change', progress => handle(progress));
        return () => unsub();
    }, [scrollProgress]);
    
    useEffect(() => {
        if(wordIdx >= 0 && wordIdx < words.length && letterIdx >= 0 && letterIdx < words[wordIdx].length)
            setWord(words[wordIdx].slice(0, letterIdx + 1));
        
        if(letterIdx == -1)
            setWord('');
        setCursorVisible(letterIdx != words[wordIdx].length - 1)
    }, [wordIdx, letterIdx]);

    return { word: word, isCursorVisible: cursorVisible}
}