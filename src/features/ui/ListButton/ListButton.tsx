import { AnimatePresence } from 'motion/react'
import './ListButton.css'
import { useState } from 'react';

import { motion } from 'motion/react';

interface Props {
    elements: string[];
    className?: string;
    onSelected?: (idx: number) => void;
    title?: string;
}

export const ListButton = ({ onSelected, elements, className='', title='Selected:'}: Props) => {
    const [currentId, setCurrentId] = useState<number>(0);
    
    const handlePrevious = () => {
        let id = 0;
        id = currentId == 0 ? elements.length - 1 : currentId - 1; 

        onSelected?.(id); 
        setCurrentId(id);
    }

    const handleNext = () => {
        let id = 0;
        id = currentId == elements.length - 1 ? 0 : currentId + 1;    

        onSelected?.(id); 
        setCurrentId(id);
    }

    return (
        <motion.div className={`list-button ${className}`} layout>
            <div className='list-button-top'>
                <button className='list-button-top-previous' onClick={() => handlePrevious()}>↓</button>

                <div className='list-button-top-element'>
                    <span>{title}</span>
                    <AnimatePresence mode='wait'>
                        <motion.h4
                        key={currentId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            { elements[currentId] }
                        </motion.h4>
                    </AnimatePresence>
                </div>

                <button className='list-button-top-next' onClick={() => handleNext()}>↑</button>
            </div>

        </motion.div>
    )
}