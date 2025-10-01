import './HeadingSection.css';

import { AnimatedText } from '../../../animatedtext/components/AnimatedText';
import { motion } from 'motion/react';
import { ListButton } from '../../../ui/ListButton/ListButton';
import { useInteractiveParticlesContext, VectorTypes } from '../../../interactiveparticles/context/InteractiveParticlesContext';

export const HeadingSection = () => {
    const [, setParticlesData] = useInteractiveParticlesContext();

    const handleSelect =  (idx: number) => {
        setParticlesData(prev => ({...prev, vectorType: Object.values(VectorTypes)[idx]}))
    }

    const h1: AnimatedText[] = [
        {
            text: 'Driving ',
            type: 'regular'
        },
        {
            text: 'innovation',
            type: 'mark' 
        },
        {
            text: ' through strategic projects',
            type: 'regular'
        }
    ];

    const p: AnimatedText[] = [
        {
            text: 'Applying ',
            type: 'regular'
        },
        {
            text: 'advanced',
            type: 'highlight'
        },
        {
            text: ' design principles and technology ',
            type: 'regular'
        },
        {
            text: 'to deliver ',
            type: 'regular' 
        },
        {
            text: 'high-impact solutions, ',
            type: 'mark' 
        },
        {
            text: 'while carefully minimizing ',
            type: 'regular'
        },
        {
            text: 'operational risks',
            type: 'error' 
        },
        {
            text: ', and consistently creating outcomes that creativity, ',
            type: 'regular'
        },
        {
            text: 'technical mastery',
            type: 'highlight'
        },
        {
            text: ', and measurable impact.',
            type: 'regular'
        }
    ];

    return (
        <section className='heading-section container'>
            <AnimatedText as='h1' delay={0.3} text={h1}/>
            <AnimatedText as='p' delay={2.8} text={p}/>

            <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}>
                <ListButton className='heading-effects' elements={Object.values(VectorTypes)} onSelected={handleSelect}>
                    Formula: 
                </ListButton>
            </motion.div>
        </section>
    )
}