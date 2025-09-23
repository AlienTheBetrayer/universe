import { AnimatePresence, type HTMLMotionProps } from 'motion/react'
import './ListButton.css'
import { useState } from 'react';

import { motion } from 'motion/react';

interface Props extends HTMLMotionProps<'button'> {
    elements: string[];
    onSelected?: (idx: number) => void;
}

type LastPress = 'previous' | 'next';

export const ListButton = ({ onSelected, elements, className=''  }: Props) => {
    const [currentId, setCurrentId] = useState<number>(0);
    const [lastPress, setLastPress] = useState<LastPress>('next');
    
    const handlePrevious = () => {
        let id = 0;
        id = currentId == 0 ? elements.length - 1 : currentId - 1; 

        setLastPress('previous');
        onSelected?.(id); 
        setCurrentId(id);
    }

    const handleNext = () => {
        let id = 0;
        id = currentId == elements.length - 1 ? 0 : currentId + 1;    

        setLastPress('next');
        onSelected?.(id); 
        setCurrentId(id);
    }

    return (
        <motion.div className={`list-button ${className}`} layout>
            <div className='list-button-top'>
                <button className='list-button-top-previous' onClick={() => handlePrevious()}>↓</button>

                <AnimatePresence mode='wait'>
                    <motion.span
                    key={currentId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                        { elements[currentId] }
                    </motion.span>
                </AnimatePresence>

                <button className='list-button-top-next' onClick={() => handleNext()}>↑</button>
            </div>

        </motion.div>
    )
}