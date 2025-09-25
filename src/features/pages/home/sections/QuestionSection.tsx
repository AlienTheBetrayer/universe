import { useRef } from 'react';
import { QuestionCanvas } from '../components/QuestionCanvas';
import './QuestionSection.css';
import { AnimatePresence, useInView } from 'motion/react';
import { motion } from 'motion/react';
import { QuestionAuroraCanvas } from '../components/QuestionAuroraCanvas';
import { useQuestionContext } from '../context/QuestionContext';


export const QuestionSection = () => {
    const [questionContextData, setQuestionContextData] = useQuestionContext();
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef);

    return (
        <section className='question-section' ref={sectionRef}>
            <AnimatePresence mode='sync'>
                { !questionContextData.revealed ? (
                    <motion.div key='question-canvas'
                        className='question-canvas-wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
                        onClick={() => setQuestionContextData(prev => ({ ...prev, revealed: true }))}
                        style={{ cursor: 'pointer' }}>
                        <QuestionCanvas renderBloom={isVisible}/>
                        <DefaultContent/>
                    </motion.div>
                ) : (
                    <motion.div key='aurora-canvas'
                        className='question-canvas-wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}>
                        <QuestionAuroraCanvas renderBloom={isVisible}/>
                        <RevealedContent/>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>

    )
}

const DefaultContent = () => {
    return (
        <div className='question-default-content'>
            Are you ready to dive in?
        </div>
    )
}

const RevealedContent = () => {
    return (
        <div className='question-revealed-content'>
            Proceed to contact.
        </div>
    )
}