import './StellarCard.css';

import { useEffect, useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useStellarContext } from "../context/StellarContext";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

import editImg from '../assets/edit.svg';

interface CardProps {
    idx: number;
    side: 'first' | 'second';
    className?: string;
}

export const StellarCard = ({ idx, side, className='' }: CardProps) => {
    const [state, dispatch] = useStellarContext();
    const isMobile = useMediaQuery(768);
    const object = state.stellars[idx];
    
    // actual card content & updating it
    const content = side === 'first' ? object.content.first : object.content.second;
    const [heading, setHeading] = useState<string>(content.title);
    const [descriptions, setDescriptions] = useState<string[]>(content.description);

    useEffect(() => {
        setHeading(content.title);
        setDescriptions(content.description);
    }, [content]);

    // hotkey interruption prevention & context update content
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        dispatch({ type: 'set_editing', flag: isEditing });

        if(!isEditing)
            dispatch({ type: 'change_content', idx: idx, part: side, title: heading, description: descriptions })
    }, [isEditing]);
    
    return (
        <motion.div className={`stellar-card ${className}`}
            style={{ y: isMobile ? '0' : '-50%' }}
            initial={{ x: -300 * (side === 'first' ? 1 : -1), opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ x: -300 * (side === 'second' ? 1 : -1), opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={object.idx}
                    className='stellar-content-container'>
                        <input className='input-h3' value={heading} onChange={(e) => setHeading(e.target.value)}
                        onFocus={() => setIsEditing(true)} onBlur={() => setIsEditing(false)}/>

                        <div className='stellar-p-container'>
                            { descriptions.map((description, idx) => (
                                <input key={idx} className='input-p' value={description}
                                onFocus={() => setIsEditing(true)} onBlur={() => setIsEditing(false)}
                                onChange={(e) => setDescriptions(prev => prev.map((val, i) => (
                                    i === idx ? e.target.value : val
                                )))}/>
                            ))}
                        </div>

                        <img className='stellar-card-edit-image' src={editImg} alt='editable'/>
                    </motion.div>
                </AnimatePresence>
        </motion.div>
    )
}