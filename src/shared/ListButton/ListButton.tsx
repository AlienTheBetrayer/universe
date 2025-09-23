import { AnimatePresence, type HTMLMotionProps } from 'motion/react'
import './ListButton.css'
import { useState } from 'react';

import { motion } from 'motion/react';

interface Props extends HTMLMotionProps<'button'> {
    elements: string[];
    onSelected?: (idx: number) => void;
}

export const ListButton = ({ onSelected, elements, className=''  }: Props) => {
    const [currentId, setCurrentId] = useState<number>(0);
    const [menuToggled, setMenuToggled] = useState<boolean>(false);
    
    const handlePrevious = () => {
        let id = 0;
        id = currentId == 0 ? elements.length - 1 : currentId - 1; 

        onSelected?.(id); 
        setCurrentId(prev => id);
    }

    const handleNext = () => {
        let id = 0;
        id = currentId == elements.length - 1 ? 0 : currentId + 1;    

        onSelected?.(id); 
        setCurrentId(prev => id);
    }

    const handleSet = (idx: number) => {
        onSelected?.(idx);
        setCurrentId(idx);
    }

    return (
        <motion.div className={`list-button ${className}`} layout>
            <div className='list-button-top'>
                <button className='list-button-top-previous' onClick={() => handlePrevious()}>↓</button>

                <button className='list-button-top-current' onClick={() => setMenuToggled(prev => !prev)}>
                    { elements[currentId] }
                </button>

                <button className='list-button-top-next' onClick={() => handleNext()}>↑</button>
            </div>

            <AnimatePresence>
                { menuToggled && (
                    <motion.div className='list-button-menu'
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}>
                        { elements?.map((elem, idx) => (
                            <button key={elem} className={`${currentId == idx ? 'list-button-menu-selected' : ''}`}
                            onClick={() => handleSet(idx)}>
                                { elem } 
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}