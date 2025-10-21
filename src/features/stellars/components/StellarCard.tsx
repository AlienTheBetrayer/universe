import './StellarCard.css';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useStellarContext } from '../context/StellarContext';

import editImg from '../assets/edit.svg';

interface CardProps {
    side: 'first' | 'second';
    className?: string;
}

export const StellarCard = ({ side, className = '' }: CardProps) => {
    const [state, dispatch] = useStellarContext();
    const isMobile = useMediaQuery(768);

    const stellar = state.stellars.find((s) => s.idx === state.selectedIdx);

    // card content in states so we can change it
    const [heading, setHeading] = useState<string>(
        (side === 'first'
            ? stellar?.content?.firstTitle
            : stellar?.content?.secondTitle) ?? '',
    );
    const [description, setDescription] = useState<string>(
        (side === 'first'
            ? stellar?.content?.firstDescription
            : stellar?.content?.secondDescription) ?? '',
    );

    // syncing it (when we move to the other stellar)
    useEffect(() => {
        setHeading(
            (side === 'first'
                ? stellar?.content?.firstTitle
                : stellar?.content.secondTitle) ?? '',
        );
        setDescription(
            (side === 'first'
                ? stellar?.content?.firstDescription
                : stellar?.content.secondDescription) ?? '',
        );
    }, [state.selectedIdx]);

    // upon finishing the edit we apply the changes
    useEffect(() => {
        if (!state.isEditing) {
            dispatch({
                type:
                    side === 'first'
                        ? 'STELLAR_SET_FIRST_CONTENT'
                        : 'STELLAR_SET_SECOND_CONTENT',
                heading,
                description,
            });
        }
    }, [state.isEditing]);

    return (
        <motion.div
            className={`stellar-card ${className}`}
            style={{ y: isMobile ? '0' : '-50%' }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 1, duration: 1.5, ease: 'backOut' },
            }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={state.selectedIdx || 0}
                    className='stellar-content-container'
                >
                    <input
                        className='input-h3'
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        onFocus={() =>
                            dispatch({
                                type: 'STELLAR_SET_EDITING',
                                flag: true,
                            })
                        }
                        onBlur={() =>
                            dispatch({
                                type: 'STELLAR_SET_EDITING',
                                flag: false,
                            })
                        }
                    />

                    <input
                        className='input-p'
                        value={description}
                        onFocus={() =>
                            dispatch({
                                type: 'STELLAR_SET_EDITING',
                                flag: true,
                            })
                        }
                        onBlur={() =>
                            dispatch({
                                type: 'STELLAR_SET_EDITING',
                                flag: false,
                            })
                        }
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <img
                        className='stellar-card-edit-image'
                        src={editImg}
                        alt='editable'
                    />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};
