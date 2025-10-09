import { useEffect, useState } from 'react';
import './StellarTutorial.css';
import { AnimatePresence, motion } from "motion/react"
import { useHotkeys } from '../../../hooks/useHotkeys';
import { useStellarContext } from '../context/StellarContext';

export const StellarTutorial = () => {
    const [selected, setSelected] = useState<number>(0);
    const [shown, setShown] = useState<boolean>(true);
    const [state, dispatch] = useStellarContext();

    const pages = [
        {
            title: '',
            description: '',
            image: '',
        }
    ]

    useHotkeys([
        { hotkey: 'Escape', action: () => setShown(false) }
    ]);

    useEffect(() => {
        console.log(shown);
    }, [shown]);

    return (
        <AnimatePresence>
            { shown && 
            <motion.div
            className='stellar-tutorial-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 3 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
                { pages.map((page, idx) => (
                    <motion.div
                    key={idx}
                    className='stellar-tutorial-card'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                        <div className='stellar-tutorial-card-image'>

                        </div>

                        <div className='stellar-tutorial-card-content'>
                            <h3>{page.title}</h3>
                            <p>{page.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div> }
        </AnimatePresence>
    )
}