import { useState } from 'react';
import { QuestionCanvas } from '../components/QuestionCanvas';
import './QuestionSection.css';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { QuestionAuroraCanvas } from '../components/QuestionAuroraCanvas';

export const QuestionSection = () => {
    const [revealed, setRevealed] = useState<boolean>(false);

    return (
        <section className='question-section'>
            <AnimatePresence mode='sync'>
                { !revealed ? (
                    <motion.div key='question-canvas'
                        className='question-canvas-wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        onClick={() => setRevealed(true)}
                        style={{ cursor: 'pointer' }}>
                        <QuestionCanvas/>
                    </motion.div>
                ) : (
                    <motion.div key='aurora-canvas'
                        className='question-canvas-wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}>
                        <QuestionAuroraCanvas/>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}