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
    const [state, setState] = useStellarContext();
    const isMobile = useMediaQuery(768);
    
    // actual card content & updating it
    const [heading, setHeading] = useState<string>((side === 'first' ? state.stellars?.[idx].content?.firstTitle : state.stellars?.[idx].content?.secondTitle) ?? '');
    const [description, setDescription] = useState<string>((side === 'first' ? state.stellars?.[idx].content?.firstDescription : state.stellars?.[idx].content?.secondDescription) ?? '');

    useEffect(() => {
        setHeading(side === 'first' ? state.stellars[idx].content.firstTitle : state.stellars[idx].content.secondTitle);
        setDescription(side === 'first' ? state.stellars[idx].content.firstDescription : state.stellars[idx].content.secondDescription);
    }, [idx]);

    // hotkey interruption prevention & context update content
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setState(prev => ({ ...prev, editing: isEditing }));

        if(!isEditing) {
            setState(prev => ({ ...prev, }))
            if(side === 'first') {
                setState(prev => ({ ...prev, stellars: prev.stellars?.map(stellar =>
                    stellar.idx === idx ? { ...stellar, content: { ...stellar.content, firstTitle: heading, firstDescription: description } } : stellar
                )}));
            } else {
                setState(prev => ({ ...prev, stellars: prev.stellars?.map(stellar =>
                    stellar.idx === idx ? { ...stellar, content: { ...stellar.content, secondTitle: heading, secondDescription: description } } : stellar
                )}));
            }
        }
    }, [isEditing]);
    
    return (
        <motion.div className={`stellar-card ${className}`}
            style={{ y: isMobile ? '0' : '-50%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={idx}
                    className='stellar-content-container'>
                        <input className='input-h3' value={heading} 
                        onChange={(e) => setHeading(e.target.value)}
                        onFocus={() => setIsEditing(true)} 
                        onBlur={() => setIsEditing(false)}/>

                        <input className='input-p' value={description}
                        onFocus={() => setIsEditing(true)} 
                        onBlur={() => setIsEditing(false)}
                        onChange={(e) => setDescription(e.target.value)}/>

                        <img className='stellar-card-edit-image' src={editImg} alt='editable'/>
                    </motion.div>
                </AnimatePresence>
        </motion.div>
    )
}