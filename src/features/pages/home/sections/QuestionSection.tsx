import { useRef } from 'react';
import './QuestionSection.css';
import { AnimatePresence, useInView } from 'motion/react';
import { motion } from 'motion/react';
import { QuestionAuroraCanvas } from '../../../questionparticles/components/QuestionAuroraCanvas';
import { LinkButton } from '../../../ui/LinkButton/components/LinkButton';
import { QuestionCanvas } from '../../../questionparticles/components/QuestionCanvas';
import { useQuestionContext } from '../../../questionparticles/context/QuestionContext';

export const QuestionSection = () => {
    const [questionContextData, setQuestionContextData] = useQuestionContext();
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef);

    return (
        <section className='question-section' ref={sectionRef}>
            <h2>Something <mark>unknown</mark> and <mark>mysterious...</mark></h2>
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
                        { isVisible && (
                            <QuestionCanvas/>
                        )}
                        <DefaultContent/>
                    </motion.div>
                ) : (
                    <motion.div key='aurora-canvas'
                        className='question-canvas-wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}>
                        { isVisible && (
                            <QuestionAuroraCanvas/>
                        )}
                        <RevealedContent/>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>

    )
}

const DefaultContent = () => {
    return (
        <div className='question-default-content'/>
    )
}

const RevealedContent = () => {
    return (
        <div className='question-revealed-content'>
            <LinkButton className='question-revealed-contact-link' to='/contact'>
                Proceed to contact.
            </LinkButton>
        </div>
    )
}